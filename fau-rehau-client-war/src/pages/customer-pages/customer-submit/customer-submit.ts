import { Component } from "@angular/core";

import { NavController, ModalController } from "ionic-angular";
import { UserService } from "../../../services/user.service";
import { DataService } from "../../../services/data.service";
import { TranslateService } from "@ngx-translate/core";
import { AlertController } from "ionic-angular";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

@Component({
  selector: "customer-order",
  templateUrl: "customer-submit.html"
})
export class CustomerSubmitPage {
  ammount: number;

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    public userService: UserService,
    public dataService: DataService,
    private barcodeScanner: BarcodeScanner,
    private translate: TranslateService
  ) {}

  scanCode() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        // Success! Barcode data is here
        this.dataService.submitOrder(barcodeData.text, this.ammount);
      },
      err => {
        // An error occurred
        this.translate
          .get(["QR_ERR_TITLE", "QR_ERR_SUBTITLE"])
          .subscribe(values => {
            let alert = this.alertCtrl.create({
              title: values.QR_ERR_TITLE,
              subTitle: values.QR_ERR_SUBTITLE + err
              //        buttons: ['OK']
            });
            alert.present();
          });
      }
    );
  }

  submitDesktop() {
    this.dataService.submitOrder("light", this.ammount);
  }
}
