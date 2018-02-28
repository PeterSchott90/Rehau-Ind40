import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LearnItemPage } from './../../central-pages/learn-item/learn-item';



@Component({
  selector: 'page-learn-menu',
  templateUrl: 'learn-menu.html',
})
export class LearnMenuPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
  }

  public openSlides(value) {
    this.navCtrl.push(LearnItemPage, {value: value});
  }

}
