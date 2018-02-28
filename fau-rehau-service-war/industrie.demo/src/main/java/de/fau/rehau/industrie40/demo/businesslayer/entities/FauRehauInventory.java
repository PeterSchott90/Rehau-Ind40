package de.fau.rehau.industrie40.demo.businesslayer.entities;

public class FauRehauInventory {
	private int lightProducts;
	private int medProducts;
	private int proProducts;
	public int getLightProducts() {
		return lightProducts;
	}
	public void setLightProducts(int lightProducts) {
		this.lightProducts = lightProducts;
	}
	public void substractLight(int sub) {
		this.lightProducts -= sub;
	}
	public void substractMed(int sub) {
		this.medProducts -= sub;
	}
	public void substractPro(int sub) {
		this.proProducts -= sub;
	}
	public int getMedProducts() {
		return medProducts;
	}
	public void setMedProducts(int medProducts) {
		this.medProducts = medProducts;
	}
	public int getProProducts() {
		return proProducts;
	}
	public void setProProducts(int proProducts) {
		this.proProducts = proProducts;
	}
	public void add(String type, int ammount) {
		if(type.equals("light")) {
			this.lightProducts += ammount;
		} else if(type.equals("med")) {
			this.medProducts += ammount;
		} else if(type.equals("pro")) {
			this.proProducts += ammount;
		}
	}
}
