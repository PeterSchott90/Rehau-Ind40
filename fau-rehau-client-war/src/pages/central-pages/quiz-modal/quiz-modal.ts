import { Component } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "page-quiz-modal",
  templateUrl: "quiz-modal.html"
})
export class QuizModalPage {
  data: any;
  context: string;
  hasAnswered: boolean = false;
  question: string;
  flashCardFlipped: boolean = false;
  flashCardFront: any;
  flashCardBack: any;
  answers: any;
  questionText: string;
  points: number;

  constructor(
    private viewCtrl: ViewController,
    private params: NavParams,
    private translate: TranslateService
  ) {
    const data = params.get("data");
    const language = translate.currentLang;
    this.points = data.points;

    if (language === "de") {
      this.context = data.contextDE;
      this.flashCardFront = data.questionDE;
      const correctAnswer = data.answersDE.filter(
        answer => answer.correct === true
      )[0].answer;
      this.flashCardBack = correctAnswer;
      const originalOrder = data.answersDE;
      this.answers = this.randomizeAnswers(originalOrder);
    } else {
      this.context = data.contextEN;
      this.flashCardFront = data.questionEN;
      const correctAnswer = data.answersEN.filter(
        answer => answer.correct === true
      )[0].answer;
      this.flashCardBack = correctAnswer;
      const originalOrder = data.answersEN;
      this.answers = this.randomizeAnswers(originalOrder);
    }
  }

  selectAnswer(answer) {
    this.hasAnswered = true;
    answer.selected = true;
    this.flashCardFlipped = true;

    if (!answer.correct) {
      this.points = 0;
    }

    setTimeout(() => {
      this.hasAnswered = false;
      answer.selected = false;
      this.viewCtrl.dismiss(this.points);
    }, 3000);
  }

  randomizeAnswers(rawAnswers: any[]): any[] {
    for (let i = rawAnswers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = rawAnswers[i];
      rawAnswers[i] = rawAnswers[j];
      rawAnswers[j] = temp;
    }

    return rawAnswers;
  }
}
