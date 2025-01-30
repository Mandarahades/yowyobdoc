package inc.yowyob.payment.repositories;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import inc.yowyob.payment.entities.MyCoolPayData;
@Repository
public interface MyCoolPayDataRepository extends CrudRepository<MyCoolPayData, UUID> {

}
