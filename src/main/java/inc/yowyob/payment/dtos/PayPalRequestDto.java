package inc.yowyob.payment.dtos;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class PayPalRequestDto extends PaymentRequest{

    @JsonProperty(value = "product_name")
    private String productName;

    @JsonProperty(value = "product_description")
    private String productDescription;

    @JsonProperty(value = "metadata")
    private Map<String, Object> metadata;

}
