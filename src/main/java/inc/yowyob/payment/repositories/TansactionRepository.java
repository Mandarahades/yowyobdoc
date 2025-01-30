package inc.yowyob.payment.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.cassandra.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import inc.yowyob.payment.entities.Transaction;

@Repository
public interface TansactionRepository extends CrudRepository<Transaction, UUID> {
	
    Optional<Iterable<Transaction>> findByConsumerId(String consumer_id);
    
    @Query("SELECT * FROM payment WHERE transaction_ref = ?0")
    Optional<Transaction> findByTansactionRef(String Tansaction_ref);
}
