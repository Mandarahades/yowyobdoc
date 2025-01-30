package inc.yowyob.payment.mappers;


import java.util.UUID;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import inc.yowyob.payment.dtos.MyCoolpayRequestDto;
import inc.yowyob.payment.dtos.PayPalRequestDto;
import inc.yowyob.payment.dtos.CreateStripeTransactionDto;
import inc.yowyob.payment.dtos.TransactionDto;
import inc.yowyob.payment.entities.Transaction;

/**
 *
 * @author douglas
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TransactionMapper extends BaseMapper<Transaction, TransactionDto> {
        
    public Transaction myCoolpayDtoToEntity(MyCoolpayRequestDto entity);
    public MyCoolpayRequestDto toMyCoolPayTransactionDto(Transaction entity);
    
    
    public Transaction stripeDtoToEntity(MyCoolpayRequestDto entity);
    public CreateStripeTransactionDto toStripeTransactionDto(Transaction entity);
    
    
    public Transaction payPalDtoToEntity(MyCoolpayRequestDto entity);
    public PayPalRequestDto toPayPalTransactionDto(Transaction entity);
    

    
    @AfterMapping
    default void setUUID(@MappingTarget Transaction transaction) {
        if (transaction.getId() == null) {
        	transaction.setId(UUID.randomUUID());
        }
        if (transaction.getMethod()== null) {
        	transaction.setStatus("PENDING");
        }
		
    }
    
}
