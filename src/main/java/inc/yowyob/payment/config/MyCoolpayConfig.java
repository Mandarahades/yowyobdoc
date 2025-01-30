package inc.yowyob.payment.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Data
public class MyCoolpayConfig {

    @Value("${my-coolpay.secret}")
    private String privateKey;
    
    @Value("${my-coolpay.key}")
    private String publicKey;
    
    @Value("${apps.payment-service.gateway}")
    private String callbackUrl;
    
    @Value("${my-coolpay.url}")
    private String url;
    
    @Value("${my-coolpay.payin-url}")
    private String payInUrl;

}
