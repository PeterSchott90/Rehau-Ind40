package de.fau.rehau.industrie40.demo.api.gamestategenerator;

import de.fau.rehau.industrie40.demo.api.entities.ConsumerGamestateDto;
import de.fau.rehau.industrie40.demo.api.entities.ProducerGamestateDto;
import de.fau.rehau.industrie40.demo.businesslayer.entities.FauRehauGroup;
import de.fau.rehau.industrie40.demo.businesslayer.entities.user.FauRehauConsumer;
import de.fau.rehau.industrie40.demo.businesslayer.entities.user.FauRehauProducer;

public class FauRehauGamestateGenerator {
	public static ConsumerGamestateDto getConsumerGamestate(FauRehauGroup group, FauRehauConsumer user) {
		ConsumerGamestateDto dtoToReturn = new ConsumerGamestateDto();
		
		dtoToReturn.setInventory(user.inventory);
		dtoToReturn.setOrders(group.getOrdersByUserId(user.getId()));
		dtoToReturn.setScoreboard(group.getScoreboard());
		dtoToReturn.setQuests(group.questLog);
		dtoToReturn.setScore(user.getScoreboardUser().score);
		dtoToReturn.setMoney(user.getMoney());
		dtoToReturn.setMessages(user.getMessages());
		dtoToReturn.setQuestsDone(user.getQuestsDone());
		dtoToReturn.setQuestion(user.getQuestion());
		dtoToReturn.setQuestionAnswered(user.getQuestionAnswered());
		return dtoToReturn;
	}
	public static ProducerGamestateDto getProduerGamestate(FauRehauGroup group, FauRehauProducer user) {
		ProducerGamestateDto dtoToReturn = new ProducerGamestateDto();
		
		dtoToReturn.setMachines(user.getFrMachines());
		dtoToReturn.setOrders(group.orderCollection);
		dtoToReturn.setScoreboard(group.getScoreboard());
		dtoToReturn.setScore(user.getScoreboardUser().score);
		dtoToReturn.setMoney(user.getMoney());
		dtoToReturn.setMessages(user.getMessages());
		dtoToReturn.setQuestion(user.getQuestion());
		dtoToReturn.setQuestionAnswered(user.getQuestionAnswered());
		return dtoToReturn;
	}
}
