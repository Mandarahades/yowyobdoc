package inc.yowyob.payment.dtos;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CreateStripeTransactionDto {

    @JsonProperty(value = "product_name")
    private String productName;

    @JsonProperty(value = "product_description")
    private String productDescription;

    @JsonProperty(value = "transaction_amount")
    private double transactionAmount;

    @JsonProperty(value = "transaction_currency")
    private String transactionCurrency;

    @JsonProperty(value = "metadata", access = JsonProperty.Access.READ_ONLY)
    private Map<String, Object> metadata;

}
