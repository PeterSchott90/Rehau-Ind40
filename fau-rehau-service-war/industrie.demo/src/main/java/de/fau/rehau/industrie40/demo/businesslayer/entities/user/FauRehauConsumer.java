package de.fau.rehau.industrie40.demo.businesslayer.entities.user;

import java.util.ArrayList;
import de.fau.rehau.industrie40.demo.businesslayer.entities.FauRehauInventory;
import de.fau.rehau.industrie40.demo.businesslayer.entities.FauRehauQuest;

public class FauRehauConsumer extends FauRehauUser {
	public FauRehauInventory inventory = new FauRehauInventory();
	private ArrayList<FauRehauQuest> questsDone;
	public ArrayList<FauRehauQuest> getQuestsDone() {
		return questsDone;
	}
	public void addQuestDone(FauRehauQuest quest) {
		this.questsDone.add(quest);
	}
	public void setQuestsDone(ArrayList<FauRehauQuest> questsDone) {
		this.questsDone = questsDone;
	}
}
