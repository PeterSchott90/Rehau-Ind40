import { AlertController } from "ionic-angular";
import { Component } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { TranslateService } from '@ngx-translate/core';
import { GoogleAnalytics } from "@ionic-native/google-analytics";

@Component({
  templateUrl: "game-over.html",
  selector: "game-over"
})
export class GameOverPage {
  feedbackEnabled: boolean = true;
  cancelTranslation: string;

  constructor(
    public userService: UserService,
    private ga: GoogleAnalytics,
    private alertCtrl: AlertController,
    private translate: TranslateService
  ) {
    translate.get(["CANCEL"]).subscribe((values) => {
      this.cancelTranslation = values.CANCEL;
    });
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: "Feedback",
      inputs: [
        {
          type: "text",
          name: "feedback",
          placeholder: "Feedback Text"
        }
      ],
      buttons: [
        {
          text: this.cancelTranslation,
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "OK",
          handler: data => {
            console.log(data.feedback);
            this.ga.trackEvent('Feedback', data.feedback).then(() => {
              console.log('feedback sent to GA');
              this.feedbackEnabled = false;
            });
          }
        }
      ]
    });
    alert.present();
  }

  reload() {
    window.location.reload();
  }
}
