package de.fau.rehau.industrie40.demo.businesslayer.entities;

import java.util.ArrayList;

import javax.naming.directory.InvalidAttributesException;

import de.fau.rehau.industrie40.businesslayer.FauRehauContext;
import de.fau.rehau.industrie40.demo.api.entities.ConsumerGamestateDto;
import de.fau.rehau.industrie40.demo.api.entities.ProducerGamestateDto;
import de.fau.rehau.industrie40.demo.api.gamestategenerator.FauRehauGamestateGenerator;
import de.fau.rehau.industrie40.demo.businesslayer.entities.orders.FauRehauOrder;
import de.fau.rehau.industrie40.demo.businesslayer.entities.orders.FauRehauOrderFactory;
import de.fau.rehau.industrie40.demo.businesslayer.entities.user.FauRehauConsumer;
import de.fau.rehau.industrie40.demo.businesslayer.entities.user.FauRehauProducer;
import de.fau.rehau.industrie40.demo.businesslayer.entities.user.FauRehauUser;
import de.fau.rehau.industrie40.demo.businesslayer.entities.user.FauRehauUserFactory;
import de.fau.rehau.industrie40.demo.exceptions.NotEnoughRessourcesException;

public class FauRehauGroup {
	private String groupCode;
	private int groupId;
	private int totalSessions = 0;
	public ArrayList<FauRehauUser> userBase = new ArrayList<FauRehauUser>();

	public ArrayList<FauRehauQuest> questLog = new ArrayList<FauRehauQuest>();
	
	public ArrayList<FauRehauScoreboardUser> scoreboardUserBase = new ArrayList<FauRehauScoreboardUser>();
	
	public ArrayList<FauRehauOrder> orderCollection = new ArrayList<FauRehauOrder>();

	public int getGroupId() {
		return groupId;
	}
	public FauRehauOrder getOrderById(int id) {
		FauRehauOrder fauRehauOrder = null;
		for(FauRehauOrder order: orderCollection) {
			if(order.getId() == id) {
				fauRehauOrder = order;
			}
		}
		return fauRehauOrder;
	}

	public FauRehauQuest getQuestById(int questId) {
		for(FauRehauQuest quest: questLog) {
			if(quest.getId() == questId) {
				return quest;
			}
		}
		return null;
	}
	public void completeQuest(int userId, int questId) throws NotEnoughRessourcesException {
		FauRehauQuest quest = getQuestById(questId);
		FauRehauConsumer user = (FauRehauConsumer) getUserById(userId);
		if(quest != null) {
			if(user.inventory.getLightProducts() >= quest.getLight() && user.inventory.getMedProducts() >= quest.getMed() && user.inventory.getProProducts() >= quest.getPro()) {
				user.inventory.substractLight(quest.getLight());
				user.inventory.substractMed(quest.getMed());
				user.inventory.substractPro(quest.getPro());
	
				user.getScoreboardUser().score += quest.getPoints();
				getUserById(userId).addMessage("Auftrag abgeschlossen +" + quest.getPoints());
				user.addQuestDone(quest);
				this.questLog.remove(quest);
			} else {
				throw new NotEnoughRessourcesException();
			}
		}
	}
	
	public FauRehauUser addUser(String role, String name) throws InvalidAttributesException {
		FauRehauUser frUser = null;;

		if(getUserByName(name) == null) {
			frUser = FauRehauUserFactory.createNewUser(role, name, totalSessions);
			userBase.add(frUser);
			totalSessions++;
		}

		return frUser;
	}

	public ArrayList<FauRehauScoreboardUser> getScoreboard() {
		ArrayList<FauRehauScoreboardUser> listToReturn = new ArrayList<FauRehauScoreboardUser>();

		for(FauRehauUser user : userBase) {
			listToReturn.add(user.getScoreboardUser());	
		}

		return listToReturn;
	}

	public void addQuestion(String question) {
		for(FauRehauUser user : userBase) {
			user.setQuestion(question);
		}
	}

	public void setQuestionAnswered(int userId, int points) {
		FauRehauUser user = getUserById(userId);
		user.setQuestionAnswered(true);
		user.getScoreboardUser().score += points;
	}

	public FauRehauUser getUserByName(String name) {
		FauRehauUser userToReturn = null;

		for(FauRehauUser user: userBase) {
			if (user.getUserName().equals(name)) {
				userToReturn = user;
			}
		}

		return userToReturn;
	}

	public void addOrder(FauRehauConsumer owner, String orderCode, int ammount) throws NotEnoughRessourcesException {
		
		FauRehauOrder order = FauRehauOrderFactory.createOrder(orderCode, ammount, owner);
		
		if (canAffordTransaction(owner, order.getCost() * order.getAmmount())) {
			makeTransaction(owner, order.getAmmount() * order.getCost());
			this.orderCollection.add(order);
			owner.addMessage("Bestellung erfolgreich aufgegeben");
		} else {
			throw new NotEnoughRessourcesException();
		}
	}
	public void makeTransaction(FauRehauUser user, int cost) {
		user.setMoney(user.getMoney() - cost);
	}
	public boolean canAffordTransaction(FauRehauUser owner, int cost) {
		return owner.getMoney() >= cost;
	}
	
	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}

	public ConsumerGamestateDto buildConsumerGamestate(int userId) throws InvalidAttributesException {
		FauRehauConsumer user = (FauRehauConsumer) getUserById(userId);

		if(user == null) {
			throw new InvalidAttributesException(userId + "");
		}
		return FauRehauGamestateGenerator.getConsumerGamestate(this, user);
	}
	
	public ProducerGamestateDto buildProducerGamestate(int userId) throws InvalidAttributesException {
		FauRehauProducer frProducer = (FauRehauProducer)getUserById(userId);
	
		if(frProducer == null)
			throw new InvalidAttributesException(userId + "");

		return FauRehauGamestateGenerator.getProduerGamestate(this, frProducer);
	}
	
	public ArrayList<FauRehauOrder> getOrdersByUserId(int userId) {
		ArrayList<FauRehauOrder> orders = new ArrayList<FauRehauOrder>();
		for(FauRehauOrder order : orderCollection) {
			if(userId == order.getOwnerId()) {
				orders.add(order);
			}
		}
		return orders;
	}
	public FauRehauUser getUserById(int userId) {
		
		FauRehauUser userToReturn = null;
		
		for(FauRehauUser user : userBase) {
			if(userId == user.getId()) {
				return userToReturn = user;
			}
		}
	
		return userToReturn;
	}
	
	public String getGroupCode() {
		return groupCode;
	}

	public void setGroupCode(String groupCode) {
		this.groupCode = groupCode;
	}
}
