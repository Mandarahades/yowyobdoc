package inc.yowyob.payment.dtos;

import java.util.Map;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import inc.yowyob.payment.entities.TransactionMethod;
import inc.yowyob.utils.dto.EntityDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDto extends EntityDto {

    @JsonProperty(value = "id")
    UUID id;

    @JsonProperty(value = "product_name")
    private String productName;

    @JsonProperty(value = "product_description")
    private String productDescription;

    @JsonProperty(value = "amount")
    private double amount;

    @JsonProperty(value = "currency")
    private String currency;

    @JsonProperty(value = "customer_phone_number")
    private String customerPhoneNumber;

    @JsonProperty(value = "method")
    private TransactionMethod method;

    @JsonProperty(value = "transaction_ref")
    private String transactionRef;

    @JsonProperty(value = "consumer_id")
    private String consumerId;

    @JsonProperty(value = "status")
    private String status;

    @JsonProperty(value = "reason")
    private String reason;

    private Map<String, Object> metadata;

}
