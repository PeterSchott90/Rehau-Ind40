package de.fau.rehau.industrie40.demo.businesslayer.entities.orders;

public class FauRehauOrderPro extends FauRehauOrder{
	public FauRehauOrderPro() {
		this.type = "pro";
		this.points = 30;
		this.cost = 40;
		
		this.timeCost = 2;
		this.setLoad(2);
	}
}