package inc.yowyob.payment.services.impl;

import java.math.BigDecimal;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Date;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;

import inc.yowyob.payment.components.MessageProducer;
import inc.yowyob.payment.dtos.MyCoolpayRequestDto;
import inc.yowyob.payment.dtos.MyCoolpayPayinResponse;
import inc.yowyob.payment.entities.ConsumerUrl;
import inc.yowyob.payment.entities.Transaction;
import inc.yowyob.payment.services.CallbackInterface;
import inc.yowyob.payment.services.PaymentInterface;
import inc.yowyob.payment.services.ValidateDataInterface;
import inc.yowyob.payment.mappers.TransactionMapper;
import inc.yowyob.payment.repositories.ConsumerUrlRepository;
import inc.yowyob.payment.repositories.TansactionRepository;
import inc.yowyob.payment.repositories.MyCoolPayDataRepository;
import com.stripe.model.checkout.Session;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.datastax.oss.driver.api.core.CqlSession;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.nimbusds.jose.shaded.gson.Gson;
import inc.yowyob.payment.config.MyCoolpayConfig;
import inc.yowyob.payment.events.MyCoolpayStartupRequestSender;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyCoolPayServiceImpl implements CallbackInterface, PaymentInterface, ValidateDataInterface {

    private Session resource;

    private String sessionPayId;

    private CqlSession session;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private TransactionMapper myCoolPayTransactionMapper;

    @Autowired
    private MyCoolPayDataRepository myCoolPayDataRepository;

    @Autowired
    private TansactionRepository transactionRepository;

    @Autowired
    private MessageProducer messageProducer;

    @Autowired
    private ConsumerUrlRepository consumerUrlRepository;

    private Gson gson = new Gson();

    @Autowired
    private MyCoolpayConfig config;

    @Override
    public boolean isValid(double amount, String currency) {
        if (amount >= 50) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public int operator() {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public String payin(Transaction transaction) {

        MyCoolpayRequestDto createMyCoolPayTransactionDto = myCoolPayTransactionMapper.toMyCoolPayTransactionDto(transaction);
        try {
            String createMyCoolPayTransactionDtoString = objectMapper.writeValueAsString(createMyCoolPayTransactionDto);
            MyCoolpayStartupRequestSender myCoolpayStartupRequestSender = new MyCoolpayStartupRequestSender(config.getPayInUrl(), createMyCoolPayTransactionDtoString, null);
            myCoolpayStartupRequestSender.onApplicationEvent(null);
            transaction.setTransactionRef(myCoolpayStartupRequestSender.getTransactionRef());
            transaction.setStatus("PENDING");
            transactionRepository.save(transaction);
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public ResponseEntity<String> handle_payment(@RequestBody String payload, HttpHeaders headers) throws InvalidKeyException, NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException {

        MyCoolpayPayinResponse myCoolpayPayinResponse = objectMapper.convertValue(payload, MyCoolpayPayinResponse.class);

        try {
            // Calculer la signature attendue
            String expectedSignature = calculateSignature(
                    myCoolpayPayinResponse.getAppTransactionRef(),
                    myCoolpayPayinResponse.getTransactionType(),
                    myCoolpayPayinResponse.getTransactionAmount(),
                    myCoolpayPayinResponse.getTransactionCurrency(),
                    myCoolpayPayinResponse.getTransactionOperator(),
                    config.getPrivateKey()
            );

            // Comparer avec la signature reçue
            if (expectedSignature.equalsIgnoreCase(myCoolpayPayinResponse.getSignature())) {
                System.out.println("Signature valide. Requête authentique.");
                // ici le code de traitement***************************
                Transaction transaction = transactionRepository.findByTansactionRef(myCoolpayPayinResponse.getTransactionRef()).get();
                if (transaction != null && "SUCCESS".equals(transaction.getStatus())) {
                    transaction.setStatus("SUCCESS");
                    transactionRepository.save(transaction);

                    ConsumerUrl consumerUrl = consumerUrlRepository.findByApiKey(transaction.getConsumerId()).get();
                    String api_gateway = config.getCallbackUrl();
                    
                    if (consumerUrl != null) {
                        api_gateway = consumerUrl.getUrl();
                    }
                    
                    String transactionString = objectMapper.writeValueAsString(transaction);
                    MyCoolpayStartupRequestSender myCoolpaystartupRequestSender = new MyCoolpayStartupRequestSender(api_gateway, transactionString, null, gson);
                    myCoolpaystartupRequestSender.onApplicationEvent(null);
                }

            } else {
                System.out.println("Signature invalide. Requête rejetée.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid signature.");
            }
        } catch (Exception e) {
            System.err.println("Erreur lors de la vérification de la signature : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing request.");
        }
        return null;
    }

    // Méthode pour calculer la signature MD5
    private String calculateSignature(
            String transactionRef,
            String transactionType,
            double transactionAmount,
            String transactionCurrency,
            String transactionOperator,
            String privateKey) throws NoSuchAlgorithmException {
        // Conversion de transactionAmount en BigDecimal
        BigDecimal formattedAmount = BigDecimal.valueOf(transactionAmount).stripTrailingZeros();
        // Concatenation des champs
        String data = transactionRef
                + transactionType
                + formattedAmount.toPlainString() // Suppression des zéros non significatifs
                + transactionCurrency
                + transactionOperator
                + privateKey;

        // Calcul du hash MD5
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] hash = md.digest(data.getBytes());
        StringBuilder sb = new StringBuilder();
        for (byte b : hash) {
            sb.append(String.format("%02x", b)); // Convertir en hexadécimal
        }
        return sb.toString();
    }

    public void sendMessageToKafka(String topic, String message) {
        messageProducer.sendMessage(topic, message);
    }

}
