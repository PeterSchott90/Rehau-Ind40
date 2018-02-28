import { Component } from "@angular/core";
import { DataService } from "./../../../services/data.service";
import { UserService } from "./../../../services/user.service";
import { ModalController } from "ionic-angular";

@Component({
  templateUrl: "producer-machines.html",
  selector: "producer-machines"
})
export class ProducerMachinesPage {
  constructor(
    public modalCtrl: ModalController,
    private dataService: DataService,
    public userService: UserService
  ) {}
  setMachine(i: number) {
    this.dataService.setActiveMachine(i);
  }
}
