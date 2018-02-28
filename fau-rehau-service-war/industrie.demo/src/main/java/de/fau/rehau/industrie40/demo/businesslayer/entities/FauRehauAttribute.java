package de.fau.rehau.industrie40.demo.businesslayer.entities;

public class FauRehauAttribute {
	private String name;
	private int optimalValue;
	private int minValue;
	private int maxValue;
	private int currentValue;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getOptimalValue() {
		return optimalValue;
	}
	public void setOptimalValue(int optimalValue) {
		this.optimalValue = optimalValue;
	}
	public int getMinValue() {
		return minValue;
	}
	public void setMinValue(int minValue) {
		this.minValue = minValue;
	}
	public double spreadVar;

	public int getMaxValue() {
		return maxValue;
	}
	public void setMaxValue(int maxValue) {
		this.maxValue = maxValue;
	}
	public int getCurrentValue() {
		return currentValue;
	}
	public void setCurrentValue(int currentValue) {
		this.currentValue = currentValue;
	}
}
