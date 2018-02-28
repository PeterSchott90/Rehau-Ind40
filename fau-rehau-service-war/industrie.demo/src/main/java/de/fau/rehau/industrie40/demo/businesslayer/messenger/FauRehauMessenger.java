package de.fau.rehau.industrie40.demo.businesslayer.messenger;

import java.util.ArrayList;
import java.util.List;

public class FauRehauMessenger {
	public List<String> messages;
	
	public FauRehauMessenger() {
		messages = new ArrayList<String>();
	}
	public List<String> getMessages() {
		List<String> messagesToReturn = this.messages;
		return messagesToReturn;
	}
}
