import { Component } from "@angular/core";

import { NavController, ModalController, NavParams } from "ionic-angular";
import { UserService } from "../../../services/user.service";
import { DataService } from "../../../services/data.service";
import { OrderDetailPage } from "../order-detail/order-detail";
import { Product } from "../../../model/product";

@Component({
  selector: "customer-orders",
  templateUrl: "customer-orders.html"
})
export class CustomerOrdersPage {
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public userService: UserService,
    public dataService: DataService
  ) {}
  showDetails(product: Product) {
    let detailModall = this.modalCtrl.create(OrderDetailPage, {
      productRef: product
    });
    detailModall.present();
  }
}
