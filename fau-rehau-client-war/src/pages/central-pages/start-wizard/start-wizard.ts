import { Component } from "@angular/core";
import {
  NavController,
  AlertController,
  Events,
  NavParams,
  Platform,
  Config
} from "ionic-angular";
import { UserService } from "../../../services/user.service";
import { DataService } from "../../../services/data.service";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { TranslateService } from "@ngx-translate/core";
import { ProducerStartPage } from "./../../producer-pages/producer-start/producer-start";
import { CustomerStartPage } from "../../customer-pages/customer-start/customer-start";

@Component({
  selector: "page-start-wizard",
  templateUrl: "start-wizard.html"
})
export class StartWizardPage {
  step: any;
  stepCondition: any;
  stepDefaultCondition: any;
  currentStep: any;

  language: string = 'de';
  isAndroid: boolean = false;
  inputName: string;
  inputRole: string;
  inputGroupCode: string;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public userService: UserService,
    public dataService: DataService,
    private barcodeScanner: BarcodeScanner,
    private translate: TranslateService,
    private platform: Platform,
    private config: Config,
    public evts: Events
  ) {
    this.isAndroid = platform.is("android");
    /**
     * Step Wizard Settings
     */
    this.step = 1; //The value of the first step, always 1
    this.stepCondition = false; //Set to true if you don't need condition in every step
    this.stepDefaultCondition = this.stepCondition; //Save the default condition for every step
    //You can subscribe to the Event 'step:changed' to handle the current step
    this.evts.subscribe("step:changed", step => {
      //Handle the current step if you need
      this.currentStep = step[0];
      //Set the step condition to the default value
      this.stepCondition = this.stepDefaultCondition;
      if (step === 1) {
        if (this.language) {
          this.stepCondition = true;
        }
      } else if (step === 2) {
        if (this.inputName) {
          this.stepCondition = true;
        }
      }
    });
  }

  ionViewDidLoad() {}

  changeLanguage() {
    this.translate.use(this.language);
    this.translate.get(["BACK_BUTTON_TEXT"]).subscribe(values => {
      this.config.set("ios", "backButtonText", values.BACK_BUTTON_TEXT);
      this.stepCondition = true;
    });
  }

  onFinish() {
    this.dataService.registerGroup(this.inputGroupCode).subscribe(
      id => {
        this.userService.currentPlayer.groupId = id;

        this.dataService.registerPlayer(this.inputName).subscribe(
          success => {
            this.userService.currentPlayer.name = this.inputName;

            this.userService.currentPlayer.playerId = success;
            if (this.userService.currentPlayer.role === "producer") {
              this.navCtrl.setRoot(ProducerStartPage);
              this.navCtrl.push(ProducerStartPage);
            } else if (this.userService.currentPlayer.role === "consumer") {
              this.navCtrl.setRoot(CustomerStartPage);
              this.navCtrl.push(CustomerStartPage);
            }
          },
          error => {
            this.dataService.error(error);
          }
        );
      },
      err => {
        this.dataService.error(err);
      }
    );
  }

  scanGroupCode() {
    this.inputGroupCode = "group-id-0";
    this.evts.publish("step:ownNext");

    // Commented out for development

    //   this.barcodeScanner.scan().then((barcodeData: any) => {
    //     // Success! Barcode data is here
    // this.inputGroupCode = barcodeData.text;
    // this.evts.publish('step:ownNext');
    //   }, (err) => {
    //     // An error occurred
    //     this.translate.get([
    //       "QR_ERR_TITLE",
    //       "QR_ERR_SUBTITLE"
    //     ]).subscribe((values) => {
    //       let alert = this.alertCtrl.create({
    //         title: values.QR_ERR_TITLE,
    //         subTitle: values.QR_ERR_SUBTITLE + err,
    // //        buttons: ['OK']
    //       });
    //       alert.present();
    //     });

    //   });
  }

  selectRole(role) {
    this.inputRole = role;
    this.userService.currentPlayer.role = role;
    this.evts.publish("step:ownNext");
  }

  confirm() {
    this.stepCondition = true;
  }

  textChange(e) {
    if (e.target.value && e.target.value.trim() !== "") {
      this.stepCondition = true;
    } else {
      this.stepCondition = false;
    }
  }
}
