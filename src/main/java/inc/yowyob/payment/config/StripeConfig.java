package inc.yowyob.payment.config;


import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Data
@Component
public class StripeConfig {
    
    @Value("${stripe.key}")
    private String apiKey;
    
    @Value("${stripe.callback-key}")
    private String callbackKey;
    
    @Value("${apps.payment-service.gateway}")
    private String callbackUrl;
    
}
