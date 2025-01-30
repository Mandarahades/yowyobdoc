package inc.yowyob.payment.entities;

import java.util.Date;
import java.util.Map;

import org.springframework.data.cassandra.core.mapping.Indexed;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table("consumer_urls")
@Data @AllArgsConstructor @NoArgsConstructor
public class ConsumerUrl {
	
	@PrimaryKey
	private String id;
	@Indexed
	private String apiKey;
	private String url;

}
