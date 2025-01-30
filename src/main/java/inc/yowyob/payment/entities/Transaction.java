package inc.yowyob.payment.entities;

import java.util.Date;
import java.util.Map;
import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.Indexed;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import inc.yowyob.scylladb.entity.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.mapping.Column;

@Table("transactions")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transaction extends Entity {

    @PrimaryKey
    private UUID id;

    @Column(value = "product_name")
    private String productName;

    @Column(value = "product_description")
    private String productDescription;

    @Column(value = "amount")
    private double amount;

    @Column(value = "currency")
    private String currency;

    @Column(value = "customer_phone_number")
    private String customerPhoneNumber;

    @Column(value = "method")
    private TransactionMethod method;

    @Indexed
    @Column(value = "transaction_ref")
    private String transactionRef;

    @Indexed
    @Column(value = "consumer_id")
    private String consumerId;

    @Indexed
    @Column(value = "status")
    private String status;

    @Column(value = "reason")
    private String reason;
    
    @CassandraType(type = CassandraType.Name.MAP, typeArguments = {CassandraType.Name.TEXT, CassandraType.Name.TEXT})
    @Column(value = "metadata")
    private Map<String, Object> metadata;

}
