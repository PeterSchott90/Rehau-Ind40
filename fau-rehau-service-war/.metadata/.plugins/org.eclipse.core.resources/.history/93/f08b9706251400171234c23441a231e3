package de.fau.rehau.industrie40.demo.businesslayer.entities.orders;

import de.fau.rehau.industrie40.demo.businesslayer.entities.user.FauRehauConsumer;

public class FauRehauOrderFactory {
	private static int idCounter = 0;
	
	public static FauRehauOrder createOrder(String orderCode, int ammount, FauRehauConsumer owner) {
		FauRehauOrder fauRehauOrder = null;

		if(orderCode.equals("light")) {
			fauRehauOrder = new FauRehauOrderLight();
		} else if(orderCode.equals("mid")) {
			fauRehauOrder = new FauRehauOrderMedium();
		} else if(orderCode.equals("pro")) {
			fauRehauOrder = new FauRehauOrderPro();
		}
		fauRehauOrder.setOwner(owner);
		fauRehauOrder.setId(idCounter);
		fauRehauOrder.setAmmount(ammount);
		idCounter++;
		return fauRehauOrder;
	}
}
