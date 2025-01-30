package inc.yowyob.payment.controllers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import inc.yowyob.payment.components.MessageProducer;
import inc.yowyob.payment.entities.Transaction;
import inc.yowyob.payment.mappers.StripeTransactionMapper;
import inc.yowyob.payment.providers.TransactionProvider;
import inc.yowyob.payment.repositories.TansactionRepository;
import inc.yowyob.payment.services.impl.StripeServiceImpl;
import com.stripe.exception.StripeException;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@RestController
@Data
@AllArgsConstructor
@NoArgsConstructor
@CrossOrigin("*")
public class StripeController {

    @Autowired
    private StripeServiceImpl stripeService;
    @Autowired
    private TransactionProvider transactionProvider;
    @Autowired
    private TansactionRepository transactionRepository;

    @Autowired
    private MessageProducer messageProducer;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private StripeTransactionMapper stripeTransactionMapper;

    @PostMapping("/create-stripe-payment/{api_key}")
    public String createCheckoutSession(@RequestBody Transaction transaction, @PathVariable String api_key) throws StripeException, JsonProcessingException {
        //Transaction transaction = stripeTransactionMapper.toEntity(createStripePaymentDto);
        transaction.setId(UUID.randomUUID());
        transaction.setConsumerId(api_key);
        transaction.setStatus("PENDING");
        transactionRepository.save(transaction);
        stripeService.sendMessageToKafka("create-session-payment", transaction.getId().toString());
        return transactionProvider.suscribe(transaction.getId().toString());
    }

}
