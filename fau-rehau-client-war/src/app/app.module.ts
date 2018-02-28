import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyApp } from './app.component';
import { FlashCardComponent } from './../components/flash-card/flash-card';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { IonSimpleWizardStep } from './../pages/other/ion-simple-wizard/ion-simple-wizard.step.component';
import { StartWizardPage } from './../pages/central-pages/start-wizard/start-wizard';
import { IonSimpleWizard } from './../pages/other/ion-simple-wizard/ion-simple-wizard.component';
import { NameSelectionPage } from '../pages/central-pages/name-selection/name-selection';
import { RoleSelectionPage } from '../pages/central-pages/role-selection/role-selection';
import { ProducerStartPage } from '../pages/producer-pages/producer-start/producer-start';
import { CustomerStartPage } from '../pages/customer-pages/customer-start/customer-start';
import { CustomerSubmitPage } from '../pages/customer-pages/customer-submit/customer-submit';
import { CustomerQuestsPage } from '../pages/customer-pages/customer-quests/customer-quests';
import { CustomerScorePage } from '../pages/customer-pages/customer-score/customer-score';
import { ProducerScorePage } from '../pages/producer-pages/producer-score/producer-score';
import { CustomerOrdersPage } from '../pages/customer-pages/customer-orders/customer-orders';
import { OrderDetailPage } from '../pages/customer-pages/order-detail/order-detail';
import { UserService } from '../services/user.service';
import { DataService } from '../services/data.service';
import { QuizModalPage } from './../pages/central-pages/quiz-modal/quiz-modal';
import { GroupSelectionPage } from '../pages/central-pages/group-selection/group-selection';
import { LearnMenuPage } from './../pages/central-pages/learn-menu/learn-menu';
import { LearnItemPage } from './../pages/central-pages/learn-item/learn-item';
import { ProducerOrderPage } from '../pages/producer-pages/producer-order/producer-order';
import { ProducerMachinesPage } from "../pages/producer-pages/producer-machines/producer-machines";
import { ProducerRepairPage } from '../pages/producer-pages/producer-repair/producer-repair';
import { QuizPopupPage } from './../pages/central-pages/quiz-popup/quiz-popup';
import { GameOverPage } from '../pages/central-pages/game-over/game-over';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    StartWizardPage,
    ProducerStartPage,
    CustomerStartPage,
    CustomerSubmitPage,
    CustomerQuestsPage,
    CustomerScorePage,
    CustomerOrdersPage,
    OrderDetailPage,
    ProducerOrderPage,
    ProducerMachinesPage,
    ProducerScorePage,
    ProducerRepairPage,
    QuizModalPage,
    GameOverPage,
    LearnMenuPage,
    LearnItemPage,
    IonSimpleWizard,
    IonSimpleWizardStep,
    FlashCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProducerStartPage,
    CustomerStartPage,
    CustomerSubmitPage,
    CustomerQuestsPage,
    CustomerScorePage,
    CustomerOrdersPage,
    OrderDetailPage,
    ProducerOrderPage,
    ProducerMachinesPage,
    ProducerScorePage,
    ProducerRepairPage,
    QuizModalPage,
    GameOverPage,
    LearnMenuPage,
    LearnItemPage,
    StartWizardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataService,
    UserService,
    GoogleAnalytics
  ]
})
export class AppModule {}
