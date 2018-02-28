import { DataService } from './../data.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  gameStarted = false;
  time = 10;

  constructor(private dataService: DataService) {
    this.dataService.hasGameStarted().subscribe((data) => {
      this.gameStarted = data;
    });
  }

  ngOnInit() {
    setInterval(() => {
      this.dataService.hasGameStarted().subscribe((data) => {
        this.gameStarted = data;
      });
    }, 5000);
  }

  startGame() {
    this.dataService.startGame(this.time).subscribe((success) => {
      alert('Success!');
      this.gameStarted = true;
  }, (error) => {
      alert('There was an Error: ' + error);
      console.log(error);
  });
  }

  stopGame() {
    this.dataService.stopGame().subscribe((success) => {
      alert('Success!');
      this.gameStarted = false;
  }, (error) => {
      alert('There was an Error: ' + error);
  });
  }

}
