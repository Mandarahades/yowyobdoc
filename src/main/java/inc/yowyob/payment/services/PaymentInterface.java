package inc.yowyob.payment.services;

import inc.yowyob.payment.entities.Transaction;

public interface PaymentInterface {
	public String payin(Transaction payment);
	public int  operator();
	
	
}
