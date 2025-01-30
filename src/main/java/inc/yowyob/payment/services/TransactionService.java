package inc.yowyob.payment.services;

import java.util.UUID;
import org.springframework.stereotype.Service;

import inc.yowyob.payment.entities.Transaction;

@Service
public interface TransactionService {

    public Iterable<Transaction> getPaymentHistory();

    public void schedulePaymentUpdateTask(UUID transactionId);

    public Transaction findById(UUID id);

}
