package inc.yowyob.payment.components;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import inc.yowyob.payment.providers.TransactionProvider;
import inc.yowyob.payment.services.impl.MyCoolPayServiceImpl;
import inc.yowyob.payment.services.impl.PayPalServiceImpl;
import inc.yowyob.payment.services.impl.StripeServiceImpl;
import com.stripe.exception.StripeException;

@Component
public class MessageConsumer {

    @Autowired
    private TransactionProvider transactionProvider;

    @Autowired
    private StripeServiceImpl stripe;

    @Autowired
    private MyCoolPayServiceImpl myCoolpay;
    private PayPalServiceImpl payPal;


    @KafkaListener(topics = "handle-stripe-payment", groupId = "yowyob")
    public void consumeStripeCallback(String message) throws StripeException {
        if (message != null) {
            try {
                stripe.handle_payment(message, null);
            } catch (InvalidKeyException | NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException
                    | IllegalBlockSizeException | BadPaddingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }

    @KafkaListener(topics = "handle-payment-my-coolpay", groupId = "yowyob")
    public void consumeCoolpayCallback(String message) throws StripeException {
        if (message != null) {

            try {
                myCoolpay.handle_payment(message, null);
            } catch (InvalidKeyException | NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException
                    | IllegalBlockSizeException | BadPaddingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

        }
    }

    @KafkaListener(topics = "handle-payment-paypal", groupId = "yowyob")
    public void consumePayPalCallback(String message) throws StripeException {
        if (message != null) {

            try {
                payPal.handle_payment(message, null);
            } catch (InvalidKeyException | NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException
                    | IllegalBlockSizeException | BadPaddingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

        }
    }

}
