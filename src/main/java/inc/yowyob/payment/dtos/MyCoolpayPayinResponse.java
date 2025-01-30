package inc.yowyob.payment.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class MyCoolpayPayinResponse {
	private String status;
    private String message;
    private String transactionRef;
    private String appTransactionRef;
    private String transactionType;
    private double transactionAmount;
    private String transactionCurrency;
    private String transactionOperator;
    private String signature;

}
