package de.fau.rehau.industrie40.demo.businesslayer.entities.orders;

public class FauRehauOrderMedium extends FauRehauOrder{
	public FauRehauOrderMedium() {
		this.type = "med";
		this.points = 20;
		this.cost = 20;
				
		this.timeCost = 1;
		this.setLoad(1);
	}
}