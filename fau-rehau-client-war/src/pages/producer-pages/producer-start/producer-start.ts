import { Component } from "@angular/core";
import { UserService } from "../../../services/user.service";

import {
  NavController,
  ModalController,
  Events,
  AlertController
} from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
import { ProducerOrderPage } from "../producer-order/producer-order";
import { ProducerMachinesPage } from "../producer-machines/producer-machines";
import { ProducerScorePage } from "../producer-score/producer-score";
import { LearnMenuPage } from "./../../central-pages/learn-menu/learn-menu";
import { ProducerRepairPage } from "../producer-repair/producer-repair";
import { DataService } from "../../../services/data.service";
import { Slide } from "../../../model/slide";
import { QuizPopupPage } from "../../central-pages/quiz-popup/quiz-popup";
import { GameOverPage } from "../../central-pages/game-over/game-over";

@Component({
  selector: "page-producer-start",
  templateUrl: "producer-start.html"
})
export class ProducerStartPage {
  slides: any;
  mainTutorial: boolean = false;
  enableTabs: boolean = false;
  producerMachinesPage = ProducerMachinesPage;
  producerOrderPage = ProducerOrderPage;
  producerScorePage = ProducerScorePage;
  producerRepairPage = ProducerRepairPage;
  learnMenuPage: any = LearnMenuPage;
  orders: string;
  machines: string;
  repair: string;
  score: string;
  learn: string;
  beginHead: string;
  beginPar: string;

  constructor(
    public event: Events,
    private userService: UserService,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private dataService: DataService,
    private translate: TranslateService,
    private alertCtrl: AlertController
  ) {
    event.subscribe("game:finished", () => {
      this.navCtrl.setRoot(GameOverPage);
    });

    translate
      .get([
        "LEARN",
        "ORDERS",
        "PROD_MACH_PLURAL",
        "REPAIR",
        "SCORE",
        "GAME_BEGIN_HEAD",
        "GAME_BEGIN_PAR",
        "TUT_SLIDES_PROD"
      ])
      .subscribe(values => {
        this.learn = values.LEARN;
        this.orders = values.ORDERS;
        this.machines = values.PROD_MACH_PLURAL;
        this.repair = values.REPAIR;
        this.score = values.SCORE;
        this.beginHead = values.GAME_BEGIN_HEAD;
        this.beginPar = values.GAME_BEGIN_PAR;
        this.slides = values["TUT_SLIDES_PROD"];
      });


    this.dataService.startGameStateInterval();
    event.subscribe("game:started", () => {
      this.mainTutorial = true;
      this.dataService.resetTimer();
      this.userService.hasEnteredGame = true;
      this.enableTabs = true;
    });
  }

  closeSlides() {
    this.mainTutorial = false;
  }
}
