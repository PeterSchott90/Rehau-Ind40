import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "page-learn-item",
  templateUrl: "learn-item.html"
})
export class LearnItemPage {
  value: string;
  slides: any;
  title: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService
  ) {
    this.value = navParams.get("value");
    this.title = 'LEARN_' + this.value;
    const translationString = 'LEARN_SLIDES_' + this.value;
    this.translate.get([translationString]).subscribe((values) => {
      // console.log(values[translationString]);
      this.slides = values[translationString];

    });
  }

  ionViewDidLoad() {}

  goBack() {
    this.navCtrl.pop();
  }
}
