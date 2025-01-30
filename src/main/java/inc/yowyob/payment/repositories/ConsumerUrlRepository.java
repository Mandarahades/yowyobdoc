package inc.yowyob.payment.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import inc.yowyob.payment.entities.ConsumerUrl;

@Repository
public interface ConsumerUrlRepository extends CrudRepository<ConsumerUrl, String> {
	
	Optional<ConsumerUrl> findByApiKey(String api_key);

}
