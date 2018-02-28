import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { NgForm } from "@angular/forms";

import "rxjs/add/operator/map";

@Injectable()
export class DataService {
  private REST_URL = "https://rehau-ind4-0.appspot.com/rest/test/";

  constructor(private http: HttpClient) {}

  startGame(time: number): Observable<any> {
    return this.http.get(this.REST_URL + "start-game?time=" + time, {
      responseType: "text"
    });
  }

  stopGame(): Observable<any> {
    return this.http.get(this.REST_URL + 'stop-game', { responseType: 'text' });
  }

  hasGameStarted(): Observable<any> {
    return this.http.get(this.REST_URL + 'has-game-started');
  }

  addQuest(
    name: string,
    groupId: string,
    productA: number,
    productB: number,
    productC: number,
    bonusPoints: number
  ): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        GroupId: groupId
      })
    };
    return this.http.get(
      this.REST_URL +
        'add-quest/' +
        name +
        '/' +
        productA +
        '/' +
        productB +
        '/' +
        productC +
        '/' +
        bonusPoints,
      options
    );
  }

  pushQuiz(question: Object) {
    return this.http.post(this.REST_URL + 'push-question', question);
  }
}
