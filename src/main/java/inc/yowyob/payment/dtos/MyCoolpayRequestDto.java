package inc.yowyob.payment.dtos;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class MyCoolpayRequestDto extends PaymentRequest {

    @JsonProperty(value = "customer_phone_number")
    private String customerPhoneNumber;

    @JsonProperty(value = "customer_lang")
    private String customerLang;

    @JsonProperty(value = "customer_email")
    private String customerEmail;

    @JsonProperty(value = "reason")
    private String reason;

}
