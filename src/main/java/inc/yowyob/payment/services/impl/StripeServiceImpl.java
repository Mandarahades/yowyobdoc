package inc.yowyob.payment.services.impl;

import java.math.BigDecimal;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import inc.yowyob.payment.components.MessageProducer;
import inc.yowyob.payment.entities.ConsumerUrl;
import inc.yowyob.payment.entities.Transaction;
import inc.yowyob.payment.repositories.ConsumerUrlRepository;
import inc.yowyob.payment.repositories.TansactionRepository;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.StripeObject;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionListLineItemsParams;
import inc.yowyob.payment.config.StripeConfig;
import inc.yowyob.payment.services.CallbackInterface;
import inc.yowyob.payment.services.PaymentInterface;
import inc.yowyob.payment.events.StripeStartupRequestSender;
import inc.yowyob.payment.services.ValidateDataInterface;
import org.springframework.beans.factory.annotation.Value;

@Service
public class StripeServiceImpl implements CallbackInterface, ValidateDataInterface, PaymentInterface {

    @Autowired
    private ObjectMapper objectMapper;

    private String sessionPayId;


    private Gson gson = new Gson();

    @Autowired
    private TansactionRepository transactionRepository;

    @Autowired
    private TransactionServiceImpl transactionService;

    @Autowired
    private ConsumerUrlRepository consumerUrlRepository;

    @Autowired
    private MessageProducer messageProducer;

    @Autowired
    private StripeConfig config;

    @Transactional
    @Override
    public String payin(Transaction transaction) {
        // Validation des données d'entrée
        if (transaction == null) {
            throw new IllegalArgumentException("Payment object cannot be null");
        }

        // Création du builder pour les paramètres de session Stripe
        SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setUiMode(SessionCreateParams.UiMode.EMBEDDED)
                .setReturnUrl("http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}")
                .setExpiresAt(Instant.now().getEpochSecond() + Duration.ofMinutes(60).getSeconds())
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(1L)
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency(transaction.getCurrency()) // Vérifie que la devise est valide dans Payment
                                                .setUnitAmountDecimal(new BigDecimal(transaction.getAmount())) // Assure une conversion correcte
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName(transaction.getProductName()) // Nom du produit
                                                                .setDescription(transaction.getProductDescription()) // Description
                                                                .build())
                                                .build())
                                .build()
                );

        // Génération de l'ID unique pour le paiement
        transaction.setId(UUID.randomUUID());
        paramsBuilder.putMetadata("transaction_id", transaction.getId().toString());

        // Ajout des métadonnées, si elles existent
        if (transaction.getMetadata() != null && !transaction.getMetadata().isEmpty()) {
            for (Map.Entry<String, Object> entry : transaction.getMetadata().entrySet()) {
                paramsBuilder.putMetadata(entry.getKey(), entry.getValue().toString());
            }
        }

        // Construction des paramètres Stripe
        SessionCreateParams params = paramsBuilder.build();

        // Création de la session Stripe
        Session session = null;
        try {
            session = Session.create(params);
        } catch (StripeException e) {
            // Log de l'erreur pour le débogage
            System.err.println("Erreur lors de la création de la session Stripe : " + e.getMessage());
            // Retourne une erreur ou lève une exception selon le besoin
            throw new RuntimeException("Erreur lors de la communication avec Stripe", e);
        }

        // Vérifie si la session Stripe a été créée avec succès
        if (session != null) {
            // Stocke l'ID de session pour une utilisation future
            this.sessionPayId = session.getId();

            // Récupère le secret client pour le retour à l'utilisateur
            Map<String, String> responseMap = new HashMap<>();
            responseMap.put("clientSecret", session.getRawJsonObject().getAsJsonPrimitive("client_secret").getAsString()); // Utilisation correcte pour Stripe

            // Mise à jour du statut de la transaction
            transaction.setStatus("PENDING");
            transactionRepository.save(transaction);

            // Planifie une tâche pour mettre à jour le statut du paiement
            transactionService.schedulePaymentUpdateTask(transaction.getId());

            // Convertit la réponse en JSON et la retourne
            return gson.toJson(responseMap);

        }

        // Si la session est null, retourne une erreur
        return null;
    }

    @Transactional
    @Override
    public ResponseEntity<String> handle_payment(String payload, HttpHeaders headers) throws NoSuchAlgorithmException, InvalidKeySpecException, InvalidKeyException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException {
        Event event = null;
        //System.out.println(payload);
        try {
            event = this.gson.fromJson(payload, Event.class);
        } catch (JsonSyntaxException e) {
            // Invalid payload
            return ResponseEntity.badRequest().build();
        }

        EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
        StripeObject stripeObject = null;
        if (dataObjectDeserializer.getObject().isPresent()) {
            stripeObject = dataObjectDeserializer.getObject().get();
        } else {
            // Deserialization failed, probably due to an API version mismatch.
            // Handle this case accordingly or return an error response.
        }
        switch (event.getType()) {
            case "checkout.session.completed":
                try {
                    Session resource = Session.retrieve(this.sessionPayId);

                    SessionListLineItemsParams params = SessionListLineItemsParams.builder().build();
                    if (resource != null) {
                        String product_metadata = resource.getMetadata().get("metadata");
                        System.out.println("voici les metadata du produit***************" + resource.getMetadata());
                        Gson gson = new Gson();
                        JsonObject metadataJson = gson.fromJson(product_metadata, JsonObject.class);
                        Transaction transaction = transactionRepository.findById(UUID.fromString(resource.getMetadata().get("transaction_id"))).get();
                        transaction.setStatus("SUCCESS");
                        transactionRepository.save(transaction);
                        System.out.println(transaction);
                        ConsumerUrl consumerUrl = consumerUrlRepository.findByApiKey(transaction.getConsumerId()).get();
                        String api_gateway = config.getCallbackUrl();
                        
                        if (consumerUrl != null) {
                            api_gateway = consumerUrl.getUrl();
                        }
                        
                        String transactionString = objectMapper.writeValueAsString(transaction);
                        //transactionService.encrypt(transactionString);
                        StripeStartupRequestSender startupRequestSender = new StripeStartupRequestSender(api_gateway, transactionString);
                        startupRequestSender.onApplicationEvent(null);
                        sendMessageToKafka("stripe-callback", transactionString);

                    }
                } catch (StripeException | JsonProcessingException e) {
                    e.printStackTrace();
                }
                break;

            // ... handle other event types
            default:
                System.out.println("Unhandled event type: " + event.getType());
        }

        return ResponseEntity.ok().build();

    }

    @Override
    public int operator() {
        // TODO Auto-generated method stub
        return 0;
    }

    // Vérification de la signature Stripe
    public Event verifyStripeSignature(String payload, String stripeSignature) throws SignatureVerificationException {
        return Webhook.constructEvent(payload, stripeSignature, config.getCallbackKey());
    }

    @Override
    public boolean isValid(double amount, String currency) {
        if (amount > 0 && (currency.equals("XAF") || (currency.equals("USD") || currency.equals("EUR") && amount >= 1))) {
            return true;
        } else {
            return false;
        }
    }

    public void sendMessageToKafka(String topic, String message) {
        messageProducer.sendMessage(topic, message);
    }

}
