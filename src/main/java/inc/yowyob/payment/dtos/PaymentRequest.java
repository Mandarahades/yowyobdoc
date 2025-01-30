package inc.yowyob.payment.dtos;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PaymentRequest implements Serializable {

    @JsonProperty(value = "amount")
    @NotBlank(message = "Le montant est requis")
    private double amount;

    @JsonProperty(value = "currency")
    @NotBlank(message = "La monnaie est requise")
    private String currency;


}
