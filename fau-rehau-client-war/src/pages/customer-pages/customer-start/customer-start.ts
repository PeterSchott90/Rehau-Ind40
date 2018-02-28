import { Component } from '@angular/core';

import { NavController, ModalController, Events, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { CustomerQuestsPage } from '../customer-quests/customer-quests';
import { CustomerSubmitPage } from '../customer-submit/customer-submit';
import { CustomerScorePage } from '../customer-score/customer-score';
import { CustomerOrdersPage } from '../customer-orders/customer-orders';
import { LearnMenuPage } from './../../central-pages/learn-menu/learn-menu';
import { QuizPopupPage } from '../../central-pages/quiz-popup/quiz-popup';
import { DataService } from '../../../services/data.service';
import { UserService } from '../../../services/user.service';
import { Slide } from '../../../model/slide';
import { GameOverPage } from '../../central-pages/game-over/game-over';

@Component({
  selector: 'page-customer-start',
  templateUrl: 'customer-start.html'
})
export class CustomerStartPage {
  slides: any;
  enableTabs: boolean = false;
  currentTopMargin: number = 56;
  currentBottomMargin: number = 0;
  customerScorePage: any = CustomerScorePage;
  customerSubmitPage: any = CustomerSubmitPage;
  customerQuestsPage: any = CustomerQuestsPage;
  customerOrdersPage: any = CustomerOrdersPage;
  learnMenuPage: any = LearnMenuPage;
  mainTutorial: boolean = false;
  submit: string;
  orders: string;
  quests: string;
  score: string;
  learn: string;
  opacity: number = 1;
  beginHead: string;
  beginPar: string;


  constructor(public event: Events,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private userService: UserService,
    private dataService: DataService,
    private translate: TranslateService,
    private alertCtrl: AlertController
  ) {
    event.subscribe('game:finished', () => {
      this.navCtrl.setRoot(GameOverPage);
    });

    translate.get([
      "LEARN",
      "CUST_TAB_SUBMIT",
      "CUST_TAB_ORDERS",
      "CUST_TAB_QUESTS",
      "SCORE",
      "GAME_BEGIN_HEAD",
      "GAME_BEGIN_PAR",
      "TUT_SLIDES_CUST"
    ]).subscribe((values) => {
      this.learn = values.LEARN;
      this.submit = values.CUST_TAB_SUBMIT;
      this.orders = values.CUST_TAB_ORDERS;
      this.quests = values.CUST_TAB_QUESTS;
      this.score = values.SCORE;
      this.beginHead = values.GAME_BEGIN_HEAD;
      this.beginPar = values.GAME_BEGIN_PAR;
      this.slides = values['TUT_SLIDES_CUST'];
    });


    this.mainTutorial = false;
    this.dataService.startGameStateInterval();
    event.subscribe('game:started', () => {
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
