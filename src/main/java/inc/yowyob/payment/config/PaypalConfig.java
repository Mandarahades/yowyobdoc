package inc.yowyob.payment.config;

import org.springframework.stereotype.Component;

import com.paypal.sdk.PaypalServerSDKClient;
import com.paypal.sdk.authentication.ClientCredentialsAuthModel;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;

@Data
@Component
public class PaypalConfig {

    @Value("${apps.payment-service.gateway}")
    private String callbackUrl;
    
    @Value("${paypal.oauth.client.id}")
    private String paypalClientId;

    @Value("${paypal.oauth.client.secret}")
    private String paypalClientSecret;
        
    PaypalServerSDKClient client = new PaypalServerSDKClient.Builder()
            .clientCredentialsAuth(new ClientCredentialsAuthModel.Builder(
                    //"OAuthClientId",
                    "AWrgavr7v-VTQtQBs4Zn9yTLPTSA60YFbKGIe5WJIKAAMCKzqWK0CeMr-kAhyoYs1QnYvaGl2mwymvyx",
                    //"OAuthClientSecret"
                    "ECfJwmH5OqJZ7muK_gDblN70HoKgIRVc0HDkHt_MAWoaDczBDDpZSSEC08msiQG5w311_TbxThECxRm1"
            )
                    .build())
            .build();

}
