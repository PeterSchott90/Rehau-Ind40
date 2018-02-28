package de.fau.rehau.industrie40.demo.api.entities;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import de.fau.rehau.industrie40.demo.businesslayer.entities.FauRehauInventory;
import de.fau.rehau.industrie40.demo.businesslayer.entities.FauRehauQuest;
import de.fau.rehau.industrie40.demo.businesslayer.entities.FauRehauScoreboardUser;
import de.fau.rehau.industrie40.demo.businesslayer.entities.orders.FauRehauOrder;

@XmlRootElement
public class ConsumerGamestateDto {
	private ArrayList<FauRehauOrder> orders;
	private ArrayList<FauRehauScoreboardUser> scoreboard;
	private FauRehauInventory inventory;
	private ArrayList<FauRehauQuest> quests;
	private int score;
	private int money;
	private ArrayList<FauRehauQuest> questsDone;
	private String timeRemaining;
	private List<String> messages;
	private String question;
	private boolean questionAnswered;
	
	public ArrayList<FauRehauOrder> getOrders() {
		return orders;
	}
	public void setOrders(ArrayList<FauRehauOrder> orderArrayList) {
		this.orders = orderArrayList;
	}
	public ArrayList<FauRehauScoreboardUser> getScoreboard() {
		return scoreboard;
	}
	public void setScoreboard(ArrayList<FauRehauScoreboardUser> scoreboard) {
		this.scoreboard = scoreboard;
	}
	public FauRehauInventory getInventory() {
		return inventory;
	}
	public void setInventory(FauRehauInventory inventory) {
		this.inventory = inventory;
	}
	public ArrayList<FauRehauQuest> getQuests() {
		return quests;
	}
	public void setQuests(ArrayList<FauRehauQuest> quests) {
		this.quests = quests;
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
	public ArrayList<FauRehauQuest> getQuestsDone() {
		return questsDone;
	}
	public void setQuestsDone(ArrayList<FauRehauQuest> questsDone) {
		this.questsDone = questsDone;
	}
	public String getTimeRemaining() {
		return timeRemaining;
	}
	public void setTimeRemaining(String timeRemaining) {
		this.timeRemaining = timeRemaining;
	}
	

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
