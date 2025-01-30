package inc.yowyob.payment.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import inc.yowyob.payment.components.MessageProducer;
import inc.yowyob.payment.dtos.MyCoolpayRequestDto;
import inc.yowyob.payment.entities.Transaction;
import inc.yowyob.payment.mappers.TransactionMapper;
import inc.yowyob.payment.providers.TransactionProvider;
import inc.yowyob.payment.repositories.TansactionRepository;
import inc.yowyob.payment.services.impl.MyCoolPayServiceImpl;
import com.stripe.exception.StripeException;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@RestController
@Data
@AllArgsConstructor
@NoArgsConstructor
@CrossOrigin("*")
public class MyCoolPayController {

    @Autowired
    private MyCoolPayServiceImpl myCoolPayService;

    @Autowired
    private TransactionProvider transactionProvider;

    @Autowired
    private TansactionRepository transactionRepository;

    @Autowired
    private MessageProducer messageProducer;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private TransactionMapper mobileTransactionMapper;

    @PostMapping("/create-mobile-payment/{api_key}")
    public String createCheckoutSession(@RequestBody MyCoolpayRequestDto createMobilePaymentDto, @PathVariable String api_key) throws StripeException, JsonProcessingException {
        Transaction transaction = mobileTransactionMapper.myCoolpayDtoToEntity(createMobilePaymentDto);
        transaction.setConsumerId(api_key);
        transactionRepository.save(transaction);
        System.out.println(transaction);
        myCoolPayService.sendMessageToKafka("create-session-payment", transaction.getId().toString());
        return transactionProvider.suscribe(transaction.getId().toString());
    }

//    @PostMapping("/create-mobile-payment/{api_key}")
//	 public String createCheckoutSession(@RequestBody MyCoolpayRequestDto createMobilePaymentDto, @PathVariable String api_key) throws StripeException, JsonProcessingException {
//		 Transaction transaction = mobileTransactionMapper.toEntity(createMobilePaymentDto);
//		 transaction.setTransactionStatus("PENDING");
//		 myCoolPayService.sendMessageToKafka(transaction.getId().toString());
//		 return myCoolPayService.payin(transaction); 
//	 }
}
