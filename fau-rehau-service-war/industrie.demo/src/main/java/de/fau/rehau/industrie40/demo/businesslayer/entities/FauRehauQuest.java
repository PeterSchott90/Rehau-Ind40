package de.fau.rehau.industrie40.demo.businesslayer.entities;

public class FauRehauQuest {
	private int med;
	private int light;
	private int pro;
	private String name;
	private int id;
	private int points;
	
	public int getPoints() {
		return this.points;
	}
	public int getMed() {
		return this.med;
	}
	public int getLight() {
		return this.light;
	}
	public int getPro() {
		return this.pro;
	}
	public FauRehauQuest(int a, int b, int c, int points, String name) {
		this.med = b;
		this.light = a;
		this.pro = c;
		this.points = points;
		this.name = name;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
}
