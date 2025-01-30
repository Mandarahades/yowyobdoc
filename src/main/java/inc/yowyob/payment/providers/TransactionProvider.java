package inc.yowyob.payment.providers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jose.shaded.gson.Gson;
import inc.yowyob.payment.entities.Transaction;
import inc.yowyob.payment.mappers.TransactionMapper;
import inc.yowyob.payment.services.impl.MyCoolPayServiceImpl;
import inc.yowyob.payment.services.impl.PayPalServiceImpl;
import inc.yowyob.payment.services.impl.StripeServiceImpl;
import inc.yowyob.payment.services.impl.TransactionServiceImpl;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Service
@Data
@AllArgsConstructor
@NoArgsConstructor
//public class TransactionProvider implements AcknowledgingMessageListener<String, String> {
public class TransactionProvider {

    @Autowired
    private TransactionServiceImpl transactionService;

    @Autowired
    private StripeServiceImpl stripe;

    @Autowired
    private MyCoolPayServiceImpl mycoolpay;

    @Autowired
    private PayPalServiceImpl paypal;

    @Autowired
    private TransactionMapper mobileTransactionMapper;

    @Autowired
    private ObjectMapper objectMapper;

    private Gson gson = new Gson();

    @KafkaListener(topics = "create-session-payment", groupId = "yowyob")
    public String suscribe(String transaction_id) throws JsonMappingException, JsonProcessingException {
        Transaction transaction = transactionService.findById(UUID.fromString(transaction_id));
        String response = null;

        if (transaction != null) {
            switch (transaction.getMethod()) {
                case card:
                    if (stripe.isValid(transaction.getAmount(), transaction.getCurrency())) {
                        System.out.println("provider stripe**************************: " + transaction);
                        response = stripe.payin(transaction);
                    }
                    break;
                case mobile:
                    System.out.println(transaction.getMethod());
                    if (mycoolpay.isValid(transaction.getAmount(), transaction.getCurrency())) {
                        System.out.println("provider coolpay**************************: " + transaction);
                        response = mycoolpay.payin(transaction);
                    }
                    break;
                case PAYPAL:
                    response = paypal.payin(transaction);
                    System.out.println("provider paypal**************************: " + transaction);
                    break;
                default:
                    break;
            }
        }

        return response;

    }
}
