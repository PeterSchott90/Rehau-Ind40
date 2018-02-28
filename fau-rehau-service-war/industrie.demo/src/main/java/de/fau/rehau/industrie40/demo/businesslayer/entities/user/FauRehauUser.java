package de.fau.rehau.industrie40.demo.businesslayer.entities.user;

import java.util.ArrayList;
import java.util.List;


import de.fau.rehau.industrie40.demo.businesslayer.entities.FauRehauScoreboardUser;

public abstract class FauRehauUser {
	protected int money = 100000;
	protected int id;
	protected String userName;
	protected FauRehauScoreboardUser user;
	protected String question;
	protected boolean questionAnswered;
	
	public List<String> getMessages() {
		List<String> toReturn = this.messages;
		this.messages = new ArrayList<String>();
		return toReturn;
	}
	public FauRehauScoreboardUser getScoreboardUser() {
		return user;
	}
	public void setScoreboardUser(FauRehauScoreboardUser user) {
		this.user = user;
	}

	public void addMessage(String message) {
		this.messages.add(message);
	}
	public void setMessages(List<String> messages) {
		this.messages = messages;
	}
	private List<String> messages = new ArrayList<String>();

	public int getMoney() {
		return money;
	}
	public void setMoney(int money) {
		this.money = money;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	/**
	 * @param question the question to set
	 */
	public void setQuestion(String question) {
		this.question = question;
		this.questionAnswered = false;
	}

	/**
	 * @return the question
	 */
	public String getQuestion() {
		return question;
	}

	/**
	 * @param questionAnswered the questionAnswered to set
	 */
	public void setQuestionAnswered(boolean questionAnswered) {
		this.questionAnswered = questionAnswered;
	}

	/**
	 * @param the questionAnswered
	 */
	public boolean getQuestionAnswered() {
		return	questionAnswered;
	}


}
