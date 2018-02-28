import { Component } from "@angular/core";

import { NavController } from "ionic-angular";
import { UserService } from "../../../services/user.service";
import { DataService } from "../../../services/data.service";

@Component({
  selector: "producer-score",
  templateUrl: "producer-score.html"
})
export class ProducerScorePage {
  constructor(
    public navCtrl: NavController,
    public dataService: DataService,
    public userService: UserService
  ) {}
}
