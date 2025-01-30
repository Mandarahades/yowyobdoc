package inc.yowyob.payment.services.impl;

import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import inc.yowyob.payment.entities.Transaction;
import inc.yowyob.payment.repositories.TansactionRepository;
import inc.yowyob.payment.services.TransactionService;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    TansactionRepository transactionRepository;

    @Override
    public Iterable<Transaction> getPaymentHistory() {
        return transactionRepository.findAll();
    }

    @Override
    public void schedulePaymentUpdateTask(UUID transactionId) {
        ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
        executor.schedule(() -> {
            Transaction transaction = transactionRepository.findById(transactionId).orElse(null);
            if (transaction != null && "PENDING".equals(transaction.getStatus())) {
                transaction.setStatus("failed");
                transactionRepository.save(transaction);
            }
        }, 60, TimeUnit.MINUTES);
    }

    @Override
    public Transaction findById(UUID id) {
        return transactionRepository.findById(id).get();
    }

}
