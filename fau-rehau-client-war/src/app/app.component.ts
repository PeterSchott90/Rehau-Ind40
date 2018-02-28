import { Component } from '@angular/core';
import { Config, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { GroupSelectionPage } from '../pages/central-pages/group-selection/group-selection';
import { CustomerStartPage } from '../pages/customer-pages/customer-start/customer-start';
import { StartWizardPage } from './../pages/central-pages/start-wizard/start-wizard';
import { ProducerStartPage } from '../pages/producer-pages/producer-start/producer-start';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = StartWizardPage;
  // rootPage = ProducerStartPage;

  constructor(platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private config: Config,
    private ga: GoogleAnalytics
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Google Analytics - change ID...
      this.ga.startTrackerWithId('UA-114383496-1')
        .then(() => {
          console.log('Google analytics is ready now');
          //the component is ready and you can call any method here
          this.ga.debugMode();
          this.ga.setAllowIDFACollection(true);
          this.ga.trackView('test');
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));
    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('de');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('de');
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }
}
