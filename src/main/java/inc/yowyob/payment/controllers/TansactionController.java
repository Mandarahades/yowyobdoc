package inc.yowyob.payment.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jose.shaded.gson.Gson;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import inc.yowyob.payment.repositories.TansactionRepository;
import inc.yowyob.payment.components.MessageProducer;
import inc.yowyob.payment.dtos.MyCoolpayRequestDto;
import inc.yowyob.payment.entities.Transaction;
import inc.yowyob.payment.providers.TransactionProvider;
import inc.yowyob.payment.services.impl.StripeServiceImpl;
import inc.yowyob.payment.services.impl.MyCoolPayServiceImpl;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@RestController
@Data
@AllArgsConstructor
@NoArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api")
public class TansactionController {

    @Autowired
    private StripeServiceImpl stripeOperator;
    @Autowired
    private MyCoolPayServiceImpl myCoolPayOperator;
    @Autowired
    private TransactionProvider transactionProvider;
    @Autowired
    private TansactionRepository paymentRepository;

    @Autowired
    private MessageProducer messageProducer;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    private final Lock lock = new ReentrantLock();

    Gson gson = new Gson();

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping("/create-checkout-my-coolpay/{api_key}")
    public String createCheckoutSession(@RequestBody MyCoolpayRequestDto payment, @PathVariable String api_key) throws StripeException, JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        String paymentString = objectMapper.writeValueAsString(payment);
        messageProducer.sendMessage("create-session-payment", paymentString);
        return transactionProvider.suscribe(paymentString);
    }

    @PostMapping("/handle-payin")
    public ResponseEntity<String> handleEvent(@RequestBody String payload,
            @RequestHeader(value = "Stripe-Signature", required = false) String stripeSignature,
            HttpServletRequest request) {
        System.out.println(stripeSignature);
        try {
            // Vérifier si la requête provient de Stripe
            if (stripeSignature != null) {
                Event event = stripeOperator.verifyStripeSignature(payload, stripeSignature);
                System.out.println("Stripe Event Type: " + event.getType());
                messageProducer.sendMessage("handle-stripe-payment", payload);
            }

            // Vérifier si la requête provient de my-coolpay
            if (request.getRemoteAddr().equals("15.236.140.89")) {
                messageProducer.sendMessage("handle-my-coolpay-payment", payload);
            }

            //rejeter la requête
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unknown source or missing signature.");

        } catch (Exception e) {
            // Gestion des exceptions générales
            System.err.println("Erreur lors du traitement de l'événement : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing event.");
        }
    }

    @GetMapping("/history")
    public Iterable<Transaction> getPaymentHistory() {
        Iterable<Transaction> payments = paymentRepository.findAll();
        return payments;
    }

    @GetMapping("/history/{api_key}")
    public Iterable<Transaction> getPaymentHistoryByConsumer(@PathVariable String api_key) {
        Iterable<Transaction> payments = paymentRepository.findByConsumerId(api_key).get();
        return payments;
    }

    @CrossOrigin
    @PostMapping("/api_gateway")
    public String res(@RequestBody String payload) {
        System.out.println("Voici le paiement recu par l'api gateway:" + payload);
        return "api_gateway message : okay";
    }

}
