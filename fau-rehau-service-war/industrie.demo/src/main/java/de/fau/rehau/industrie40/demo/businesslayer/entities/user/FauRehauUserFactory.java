package de.fau.rehau.industrie40.demo.businesslayer.entities.user;

import javax.naming.directory.InvalidAttributesException;

import de.fau.rehau.industrie40.businesslayer.FauRehauContext;
import de.fau.rehau.industrie40.demo.businesslayer.entities.FauRehauScoreboardUser;

public class FauRehauUserFactory {

	public static FauRehauUser createNewUser(String role, String name, int userId) throws InvalidAttributesException {

		FauRehauUser userToReturn;

		if(role.equals("consumer")) {
			userToReturn = new FauRehauConsumer();
		} else if(role.equals("producer")) {
			userToReturn = new FauRehauProducer();
		} else {
			throw new InvalidAttributesException(role);
		}

		userToReturn.setId(userId);
		userToReturn.setUserName(name);
		userToReturn.setScoreboardUser(getNewScoreboardUser(name, userId));

		return userToReturn;
	}

	private static FauRehauScoreboardUser getNewScoreboardUser(String name, int userId) {
		FauRehauScoreboardUser user = new FauRehauScoreboardUser();
		user.name = name;
		user.id = userId;
		user.score = 0;
		return user;
	}
}
