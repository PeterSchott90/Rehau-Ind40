import { Injectable } from '@angular/core';
import { Player } from '../model/player';
import { Product } from '../model/product';
import { Quest } from '../model/quest';
import { ScoreboardEntry } from '../model/scoreboardEntry';

import { DataService } from '../services/data.service';

@Injectable()
export class UserService {
  scoreboardEntries: Array<ScoreboardEntry>;

  productQueue: Array<Product>;
  productsDone: Array<Product>;
  productsWaiting: Array<Product>;

  timeRemaining: string;

  questQueue: Array<Quest>
  questsDone: Array<Quest>;

  currentPlayer: Player;
  hasEnteredGame: boolean;

  constructor() {
    this.scoreboardEntries = new Array<ScoreboardEntry>();
    this.productQueue = new Array<Product>();
    this.productsDone = new Array<Product>();
    this.productsWaiting = new Array<Product>();

    this.questQueue = new Array<Quest>();
    this.questsDone = new Array<Quest>();

    this.currentPlayer = new Player();
  }



  getTimeString(): string {
    return this.timeRemaining;
  }
  setScoreboard(scoreboardEntries: ScoreboardEntry[]) {
    scoreboardEntries.sort((a: ScoreboardEntry, b: ScoreboardEntry) => {
        if (a.score > b.score)
            return -1;
        else if (a.score < b.score)
            return 1;
        else if (a.score === b.score)
            return 0;
    })
    this.scoreboardEntries = scoreboardEntries;
  }
}
