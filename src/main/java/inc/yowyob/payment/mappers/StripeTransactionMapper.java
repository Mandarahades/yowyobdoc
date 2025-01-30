package inc.yowyob.payment.mappers;

import java.util.UUID;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import inc.yowyob.payment.dtos.CreateStripeTransactionDto;
import inc.yowyob.payment.entities.Transaction;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface StripeTransactionMapper extends BaseMapper<Transaction, CreateStripeTransactionDto> {
	
    
  public CreateStripeTransactionDto toTransactionDto(CreateStripeTransactionDto entity);
  
  
  public Transaction toEntity(CreateStripeTransactionDto entity);
  
  
  @AfterMapping
  default void setUUID(@MappingTarget Transaction payment) {
      if (payment.getId() == null) {
      	payment.setId(UUID.randomUUID());
      }
  }
      

}
