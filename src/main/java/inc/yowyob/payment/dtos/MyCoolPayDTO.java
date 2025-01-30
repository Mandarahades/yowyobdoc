package inc.yowyob.payment.dtos;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@AllArgsConstructor 
@NoArgsConstructor
public class MyCoolPayDTO {
    private double transactionAmount;
    private String transactionCurrency;
    private String transactionReason;
    private String customerPhoneNumber;
    private String customerName;
    private String customerEmail;
    private String customerLang;
    
}
