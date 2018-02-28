import { Component } from "@angular/core";

import { NavController } from "ionic-angular";
import { UserService } from "../../../services/user.service";
import { DataService } from "../../../services/data.service";

@Component({
  selector: "customer-score",
  templateUrl: "customer-score.html"
})
export class CustomerScorePage {
  constructor(
    public navCtrl: NavController,
    public dataService: DataService,
    public userService: UserService
  ) {}
}
