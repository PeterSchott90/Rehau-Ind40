package de.fau.rehau.industrie40.demo.businesslayer.entities;

import de.fau.rehau.industrie40.demo.businesslayer.entities.orders.FauRehauOrder;
import de.fau.rehau.industrie40.demo.businesslayer.entities.user.FauRehauProducer;
import de.fau.rehau.industrie40.demo.businesslayer.timers.FauRehauTick;

public class FauRehauMachine implements FauRehauTick {

	private FauRehauOrder currentOrder;
	private double workloadPercentage;
	private boolean isActive = false;
	private int odds = 50;
	private String status = "AVAILABLE";

	private int repairCost;
	private int freezeCost;

	private FauRehauProducer owner;
	private int freezeTime = 0;
	private int id;
	public int getFreezeCost() {
		return this.freezeCost;
	}
	public int getFreezeTime() {
		return this.freezeTime;
	}
	
	public void repair() {
		this.status = "REPAIRING";
		this.freezeTime = this.freezeCost;
		if(this.currentOrder != null) {
		this.currentOrder.setStatus("waiting");
		this.currentOrder = null;
		}
		this.repairCost = 0;
		this.workloadPercentage = 0;
	}
	public void setOwner(FauRehauProducer owner) {
		this.owner = owner;
	}
	public String getStatus() {
		return this.status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getOdds() {
		return odds;
	}
	public void increaseWorkload(double load) {
		this.workloadPercentage += load;
	}
	public void setOdds(int odds) {
		this.odds = odds;
	}

	public boolean isFree() {
		return this.currentOrder == null && this.status.equals("AVAILABLE");
	}

	public FauRehauOrder getCurrentOrder() {
		return currentOrder;
	}

	public void setCurrentOrder(FauRehauOrder currentOrder) {
		this.currentOrder = currentOrder;
		currentOrder.setStatus("started");
	}

	public double getWorkloadPercentage() {
		return workloadPercentage;
	}

	public void resetWorkloadPercentage() {
		this.workloadPercentage = 0;
	}

	@Override
	public void tick() {

		if(freezeTime > 0) {
			this.freezeTime--;
			return;
		} else if(this.status.equals("REPAIRING")){
			this.status = "AVAILABLE";
			return;
		}

		if(!this.status.equals("AVAILABLE"))
			return;

		if(this.workloadPercentage >= 100 && this.currentOrder != null && !this.currentOrder.getStatus().equals("broken")) {

				this.workloadPercentage = 100;
				this.freezeCost = 80;
				this.repairCost = 1500;
				if(this.currentOrder.getProgress() >= 100) {
					this.currentOrder.setFinished();
				} else {
					this.currentOrder.setStatus("waiting");
				}
	
				this.status = "NEED_REPAIR";
				this.currentOrder = null;
				this.owner.addMessage("Eine Ihrer Maschinen ist defekt!");
				
		} else if (this.currentOrder != null && this.workloadPercentage < 100 && !this.currentOrder.getStatus().equals("broken")) {

			if(this.currentOrder.getProgress() >= 100) {
				this.currentOrder.setFinished();
				this.currentOrder = null;
			} else {
				if(this.workloadPercentage > 50) {
					this.freezeCost = 15;
					this.repairCost = 500;
				} else if(this.workloadPercentage > 75) {
					this.freezeCost = 20;
					this.repairCost = 750;
					this.currentOrder.getOwner().addMessage("Auslastung einer Ihrer Maschinen bei über 75%");
				} else {
					this.freezeCost = 10;
					this.repairCost = 250;
				}

				this.workloadPercentage += this.currentOrder.getLoadPerTick();
				this.currentOrder.increaseProgress();				
			}			
		} else if (this.currentOrder != null && this.currentOrder.getStatus().equals("broken")) {
			this.currentOrder = null;
		}
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	public int getRepairCost() {
		return repairCost;
	}
	public void setRepairCost(int repairCost) {
		this.repairCost = repairCost;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
}
