package de.fau.rehau.industrie40.demo.businesslayer.entities.user;

import de.fau.rehau.industrie40.businesslayer.FauRehauContext;
import de.fau.rehau.industrie40.demo.businesslayer.entities.FauRehauMachine;

public class FauRehauProducer extends FauRehauUser {
	public static final int MACHINE_AMMOUNT = 2;

	private FauRehauMachine[] frMachines = new FauRehauMachine[MACHINE_AMMOUNT];
	public FauRehauMachine[] getFrMachines() {
		return frMachines;
	}

	public void setFrMachine(FauRehauMachine[] frMachine) {
		this.frMachines = frMachine;
	}

	private int currentMachineIndex = 0;

	public FauRehauProducer() {
		for(int i = 0; i < MACHINE_AMMOUNT; i++) {
			this.frMachines[i] = new FauRehauMachine();
			FauRehauContext.addToHeartBeat(this.frMachines[i]);
			this.frMachines[i].setOwner(this);
			this.frMachines[i].setId(i);
		}
		frMachines[0].setActive(true);
	}

	public void setActiveMachine(int machineIndex) {
		this.currentMachineIndex = machineIndex;
		for(FauRehauMachine frMachine: frMachines) {
			frMachine.setActive(false);
		}
		frMachines[machineIndex].setActive(true);
	}

	public FauRehauMachine getCurrentMachine() {
		return frMachines[currentMachineIndex];
	}
}
