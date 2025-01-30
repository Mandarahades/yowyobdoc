package inc.yowyob.payment.services.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jose.shaded.gson.Gson;
import inc.yowyob.payment.components.MessageProducer;
import inc.yowyob.payment.config.PaypalConfig;
import inc.yowyob.payment.entities.ConsumerUrl;
import inc.yowyob.payment.entities.Transaction;
import inc.yowyob.payment.repositories.ConsumerUrlRepository;
import inc.yowyob.payment.repositories.TansactionRepository;
import inc.yowyob.payment.services.CallbackInterface;
import inc.yowyob.payment.events.MyCoolpayStartupRequestSender;
import inc.yowyob.payment.services.PaymentInterface;
import inc.yowyob.payment.services.ValidateDataInterface;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Date;
import java.util.Map;
import java.util.HashMap;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Service
public class PayPalServiceImpl implements CallbackInterface, ValidateDataInterface, PaymentInterface {

    private Gson gson = new Gson();

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MessageProducer messageProducer;

    private RestTemplate restTemplate;

    private static final Logger logger = LoggerFactory.getLogger(PayPalServiceImpl.class);
    
    @Autowired
    private TansactionRepository paymentRepository;

    @Autowired
    private ConsumerUrlRepository consumerUrlRepository;

    @Autowired
    private PaypalConfig config;

    @Override
    public String payin(Transaction transaction) {
        try {
            // Obtenez le token d'accès
            String accessToken = getAccessToken();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + accessToken); // Ajout du token

            // Corps de la requête pour PayPal
            String requestBody = "{"
                    + "\"purchase_units\": [{"
                    + "\"amount\": {"
                    + "\"currency_code\": \"" + transaction.getCurrency()+ "\","
                    + "\"value\": \"" + transaction.getAmount()+ "\""
                    + "},"
                    + "\"reference_id\": \"" + transaction.getId() + "\""
                    + "}],"
                    + "\"intent\": \"CAPTURE\","
                    + "\"payment_source\": {"
                    + "\"paypal\": {"
                    + "\"experience_context\": {"
                    + "\"payment_method_preference\": \"IMMEDIATE_PAYMENT_REQUIRED\","
                    + "\"payment_method_selected\": \"PAYPAL\","
                    + "\"brand_name\": \"EXAMPLE INC\","
                    + "\"locale\": \"en-US\","
                    + "\"landing_page\": \"LOGIN\","
                    + "\"shipping_preference\": \"GET_FROM_FILE\","
                    + "\"user_action\": \"PAY_NOW\","
                    + "\"return_url\": \"https://example.com/returnUrl\","
                    + "\"cancel_url\": \"https://example.com/cancelUrl\""
                    + "}"
                    + "}"
                    + "}"
                    + "}";

            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
            RestTemplate restTemplate = new RestTemplate();

            ResponseEntity<String> response = restTemplate.postForEntity(
                    "https://api-m.sandbox.paypal.com/v2/checkout/orders", // PayPal API endpoint pour les commandes
                    entity,
                    String.class
            );

            if (response.getStatusCode().is2xxSuccessful()) {
                return response.getBody();
            } else {
                throw new RuntimeException("Erreur lors de la création de l'ordre PayPal : " + response.getStatusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Erreur : " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<String> handle_payment(String payload, HttpHeaders headers)
            throws NoSuchAlgorithmException, InvalidKeySpecException, InvalidKeyException, NoSuchPaddingException,
            IllegalBlockSizeException, BadPaddingException {
        // TODO Auto-generated method stub
        Transaction transaction = gson.fromJson(payload, Transaction.class);

        try {
            // Étape 1 : Vérifiez la signature du webhook pour garantir son authenticité
            boolean isValid = verifyWebhookSignature(headers, payload);
            if (!isValid) {
                logger.error("Signature du webhook invalide.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Webhook Signature");
            }

            // Étape 2 : Parsez le payload pour récupérer l'événement
            logger.info("Webhook reçu : {}", payload);
            String eventType = extractEventType(payload);

            // Étape 3 : Traitez l'événement en fonction de son type
            switch (eventType) {
                case "PAYMENT.CAPTURE.COMPLETED":
                    logger.info("Paiement réussi !");
                    // Ajoutez votre logique pour un paiement réussi
                    Transaction newTransaction = paymentRepository.findByTansactionRef(transaction.getTransactionRef()).get();
                    if (newTransaction != null && "SUCCESS".equals(newTransaction.getStatus())) {
                        newTransaction.setStatus("success");
                        paymentRepository.save(newTransaction);

                        ConsumerUrl consumerUrl = consumerUrlRepository.findByApiKey(newTransaction.getConsumerId()).get();
                        String api_gateway = config.getCallbackUrl();
                        
                        if (consumerUrl != null) {
                            api_gateway = consumerUrl.getUrl();
                        }
                        String transactionString = objectMapper.writeValueAsString(newTransaction);
                        MyCoolpayStartupRequestSender myCoolpaystartupRequestSender = new MyCoolpayStartupRequestSender(api_gateway, transactionString, null, gson);
                        myCoolpaystartupRequestSender.onApplicationEvent(null);
                    }
                    break;

                case "PAYMENT.CAPTURE.DENIED":
                    logger.info("Paiement refusé.");
                    // Ajoutez votre logique pour un paiement refusé
                    break;

                case "PAYMENT.CAPTURE.FAILED":
                    logger.info("Paiement échoué.");
                    // Ajoutez votre logique pour un paiement échoué
                    break;

                case "CHECKOUT.ORDER.COMPLETED":
                    logger.info("Commande complétée.");
                    // Ajoutez votre logique pour une commande complétée

                    break;

                default:
                    logger.warn("Événement non traité : {}", eventType);
            }

            // Retournez un statut 200 pour signaler que le webhook a été traité
            return ResponseEntity.ok("Webhook reçu avec succès.");
        } catch (Exception e) {
            logger.error("Erreur lors du traitement du webhook : ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur interne.");
        }
    }

    // Méthode pour extraire le type d'événement du payload JSON
    private String extractEventType(String payload) {
        try {
            // Parsez le JSON pour récupérer le champ "event_type"
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(payload);
            return jsonNode.get("event_type").asText();
        } catch (Exception e) {
            logger.error("Erreur lors de l'extraction du type d'événement : ", e);
            return null;
        }
    }

    public boolean verifyWebhookSignature(HttpHeaders headers, String payload) throws Exception {
        String accessToken = getAccessToken(); // Obtenez un token OAuth 2.0 (voir étape suivante)

        // Préparez la requête pour vérifier la signature
        String url = "https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature";
        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.setContentType(MediaType.APPLICATION_JSON);
        requestHeaders.set("Authorization", "Bearer " + accessToken);

        // Construisez le corps de la requête
        String webhookId = "VOTRE_WEBHOOK_ID"; // Remplacez par l'ID de votre webhook PayPal
        Map<String, Object> body = new HashMap<>();
        body.put("transmission_id", headers.getFirst("paypal-transmission-id"));
        body.put("transmission_time", headers.getFirst("paypal-transmission-time"));
        body.put("cert_url", headers.getFirst("paypal-cert-url"));
        body.put("auth_algo", headers.getFirst("paypal-auth-algo"));
        body.put("transmission_sig", headers.getFirst("paypal-transmission-sig"));
        body.put("webhook_id", webhookId);
        body.put("webhook_event", payload);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, requestHeaders);

        // Envoyez la requête à l'API PayPal
        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

        // Vérifiez la réponse
        if (response.getStatusCode().is2xxSuccessful()) {
            String status = response.getBody().get("verification_status").toString();
            return "SUCCESS".equals(status);
        }

        return false;
    }

    public String getAccessToken() throws Exception {
        String url = "https://api-m.sandbox.paypal.com/v1/oauth2/token"; // Sandbox endpoint
        String clientId = config.getPaypalClientId(); // Remplacez par votre Client ID
        String secret = config.getPaypalClientSecret(); // Remplacez par votre Secret

        // Configuration des headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth(clientId, secret); // Authentification Basic (Client ID + Secret)

        // Corps de la requête (grant_type obligatoire)
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "client_credentials");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            // Récupérez le token d'accès dans la réponse
            return response.getBody().get("access_token").toString();
        } else {
            throw new RuntimeException("Échec de l'obtention du token OAuth : " + response.getStatusCode());
        }
    }

    @Override
    public int operator() {
        // TODO Auto-generated method stub
        return 3;
    }

    @Override
    public boolean isValid(double amount, String currency) {
        // TODO Auto-generated method stub
        if ((currency.equalsIgnoreCase("USD") || currency.equalsIgnoreCase("EUR")) && amount >= 0.5) {
            return true;
        } else {
            return false;
        }
    }

    public void sendMessageToKafka(String topic, String message) {
        messageProducer.sendMessage(topic, message);
    }

}
