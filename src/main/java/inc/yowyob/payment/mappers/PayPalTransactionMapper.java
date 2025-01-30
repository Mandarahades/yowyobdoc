package inc.yowyob.payment.mappers;

import java.util.UUID;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import inc.yowyob.payment.dtos.MyCoolpayRequestDto;
import inc.yowyob.payment.dtos.PayPalRequestDto;
import inc.yowyob.payment.entities.Transaction;



@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PayPalTransactionMapper extends BaseMapper<Transaction, PayPalRequestDto>{
	
	 
    public PayPalRequestDto toTransactionDto(PayPalRequestDto entity);
 
    
    public Transaction toEntity(PayPalRequestDto entity);
    
    
    @AfterMapping
    default void setUUID(@MappingTarget Transaction payment) {
        if (payment.getId() == null) {
        	payment.setId(UUID.randomUUID());
        }
    }
    

}
