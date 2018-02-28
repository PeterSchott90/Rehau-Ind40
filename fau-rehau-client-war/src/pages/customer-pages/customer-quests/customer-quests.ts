import { Component } from "@angular/core";

import { UserService } from "../../../services/user.service";
import { DataService } from "../../../services/data.service";
import { Quest } from "../../../model/quest";
import { NavController, ModalController, NavParams } from "ionic-angular";

@Component({
  selector: "customer-quests",
  templateUrl: "customer-quests.html"
})
export class CustomerQuestsPage {
  constructor(
    public modalCtrl: ModalController,
    public dataService: DataService,
    public navCtrl: NavController,
    public userService: UserService
  ) {}

  submit(item: Quest) {
    this.dataService.completeQuest(item);
  }
}
