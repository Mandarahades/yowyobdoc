package inc.yowyob.payment.entities;


import org.springframework.data.cassandra.core.mapping.UserDefinedType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@UserDefinedType("product_app")
@Data @AllArgsConstructor @NoArgsConstructor
public class ProductApp {
	
	 private String id;
	 private String product_name;
	 private String product_description ;

}




