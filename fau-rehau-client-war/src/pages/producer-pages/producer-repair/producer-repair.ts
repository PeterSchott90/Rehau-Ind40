import { Component } from "@angular/core";

import { NavController, ModalController } from "ionic-angular";
import { DataService } from "../../../services/data.service";
import { Product } from "../../../model/product";
import { UserService } from "../../../services/user.service";
import { Machine } from "../../../model/machine";

@Component({
  selector: "producer-repair",
  templateUrl: "producer-repair.html"
})
export class ProducerRepairPage {
  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private dataService: DataService,
    public userService: UserService
  ) {}

  repair(machine: Machine) {
    this.dataService.repairMachine(machine.id);
  }
}
