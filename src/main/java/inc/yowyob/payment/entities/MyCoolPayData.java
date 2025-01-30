package inc.yowyob.payment.entities;

import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.Indexed;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Table("mycoolpay_data")
@Data @AllArgsConstructor @NoArgsConstructor
public class MyCoolPayData {
	@PrimaryKey
	UUID id;
	
	@Indexed
	@JsonProperty(value="transaction_ref")
    private String transactionRef;
	
	@JsonProperty(value="transaction_operator")
    private String transactionOperator;
	
	@JsonProperty(value="customer_phone_number")
	private String customerPhoneNumber;
	
	@JsonProperty(value="app_transaction_ref")
    private String appTransactionRef;
	
	@JsonProperty(value="application")
	private String application;
	
	@JsonProperty(value="operator_transaction_ref")
    private String operatorTransactionRef;
	
	@JsonProperty(value="transaction_fees")
    private int transactionFees;
	
	@JsonProperty(value="customer_name")
	private String customerName;


}
