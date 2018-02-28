package de.fau.rehau.industrie40.demo.api.entities;

import java.util.ArrayList;
import java.util.List;


import de.fau.rehau.industrie40.demo.businesslayer.entities.FauRehauMachine;
import de.fau.rehau.industrie40.demo.businesslayer.entities.FauRehauScoreboardUser;
import de.fau.rehau.industrie40.demo.businesslayer.entities.orders.FauRehauOrder;

public class ProducerGamestateDto {
	private ArrayList<FauRehauOrder> orders;
	private ArrayList<FauRehauScoreboardUser> scoreboard;
	private FauRehauMachine[] machines;
	private int score;
	private int money;
	private List<String> messages;
	private String timeRemaining;
	private boolean questionAnswered;
	
	public ArrayList<FauRehauOrder> getOrders() {
		return orders;
	}
	public void setOrders(ArrayList<FauRehauOrder> orders) {
		this.orders = orders;
	}
	public ArrayList<FauRehauScoreboardUser> getScoreboard() {
		return scoreboard;
	}
	public void setScoreboard(ArrayList<FauRehauScoreboardUser> scoreboard) {
		this.scoreboard = scoreboard;
	}
	public FauRehauMachine[] getMachines() {
		return machines;
	}
	public void setMachines(FauRehauMachine[] machines) {
		this.machines = machines;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public int getMoney() {
		return money;
	}
	public void setMoney(int money) {
		this.money = money;
	}
	public List<String> getMessages() {
		return messages;
	}
	public void setMessages(List<String> messages) {
		this.messages = messages;
	}
	public String getTimeRemaining() {
		return timeRemaining;
	}
	public void setTimeRemaining(String timeRemaining) {
		this.timeRemaining = timeRemaining;
	}

	private String question;

	/**
	 * @return the question
	 */
	public String getQuestion() {
		return question;
	}
	/**
	 * @param question the question to set
	 */
	public void setQuestion(String question) {
		this.question = question;
	}
	/**
	 * @return the questionAnswered
	 */
	public boolean isQuestionAnswered() {
		return questionAnswered;
	}
	/**
	 * @param questionAnswered the questionAnswered to set
	 */
	public void setQuestionAnswered(boolean questionAnswered) {
		this.questionAnswered = questionAnswered;
	}
}
