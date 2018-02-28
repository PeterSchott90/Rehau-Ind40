import { DataService } from './data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatSidenavModule,
         MatListModule,
         MatIconModule,
         MatMenuModule,
         MatRadioModule,
         MatButtonModule,
         MatToolbarModule,
         MatProgressSpinnerModule,
         MatFormFieldModule,
         MatInputModule,
         MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameRulesComponent } from './game-rules/game-rules.component';
import { QuizComponent } from './quiz/quiz.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'game-rules',
    component: GameRulesComponent
  },
  {
    path: 'quiz',
    component: QuizComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GameRulesComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Material
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,

    // Flex
    FlexLayoutModule,

    // Router
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
