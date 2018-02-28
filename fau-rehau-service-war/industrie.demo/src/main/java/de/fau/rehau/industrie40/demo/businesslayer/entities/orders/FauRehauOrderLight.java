package de.fau.rehau.industrie40.demo.businesslayer.entities.orders;

public class FauRehauOrderLight extends FauRehauOrder {
	public FauRehauOrderLight() {
		this.setPoints(10);
		this.type = "light";
		this.cost = 10;
		
		this.timeCost = 0.5;
		this.setLoad(0.5);
	}
}
