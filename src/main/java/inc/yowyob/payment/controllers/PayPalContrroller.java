package inc.yowyob.payment.controllers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import inc.yowyob.payment.entities.Transaction;
import inc.yowyob.payment.mappers.PayPalTransactionMapper;
import inc.yowyob.payment.providers.TransactionProvider;
import inc.yowyob.payment.repositories.TansactionRepository;
import inc.yowyob.payment.services.impl.PayPalServiceImpl;
import com.stripe.exception.StripeException;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@RestController
@Data
@AllArgsConstructor
@NoArgsConstructor
@CrossOrigin("*")
public class PayPalContrroller {

    @Autowired
    private PayPalServiceImpl payPalService;

    @Autowired
    private TransactionProvider transactionProvider;

    @Autowired
    private TansactionRepository transactionRepository;

    @Autowired
    private PayPalTransactionMapper payPalTransactionMapper;

    @PostMapping("/create-paypal-payment/{api_key}")
    public String createCheckoutSession(@RequestBody Transaction transaction, @PathVariable String api_key) throws StripeException, JsonProcessingException {
        //Transaction transaction = payPalTransactionMapper.toEntity(createPayPalPaymentDto);
        transaction.setId(UUID.randomUUID());
        transaction.setConsumerId(api_key);
        transaction.setStatus("PENDING");
        transactionRepository.save(transaction);
        payPalService.sendMessageToKafka("create-session-payment", transaction.getId().toString());
        return transactionProvider.suscribe(transaction.getId().toString());
    }

}
