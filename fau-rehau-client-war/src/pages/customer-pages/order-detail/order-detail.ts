import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController } from 'ionic-angular';
import { Product } from '../../../model/product';
import { NavController } from 'ionic-angular';
import { OrderAttribute } from '../../../model/order-attribute';
import { UserService } from '../../../services/user.service';
import { QuizPopupPage } from '../../central-pages/quiz-popup/quiz-popup';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'order-detail',
  templateUrl: 'order-detail.html'
})
export class OrderDetailPage {
    product: Product;

  constructor(private dataService: DataService, private modalCtrl: ModalController,private viewCtrl: ViewController, private userService: UserService, params: NavParams) {
      this.product = params.get('productRef');
  }
  dismiss() {
      this.viewCtrl.dismiss();
  }
  cancelOrder() {

  }
}
