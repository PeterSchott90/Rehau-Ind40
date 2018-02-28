import { Router } from '@angular/router';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-game-rules',
  templateUrl: './game-rules.component.html',
  styleUrls: ['./game-rules.component.scss']
})
export class GameRulesComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.dataService.addQuest(f.value.name, f.value.groupId,
      f.value.a, f.value.b, f.value.c, f.value.points).subscribe((success) => {
        alert('Success!');
        this.router.navigateByUrl('/dashboard');
      }, (error) => {
        alert('There was an Error: ' + error);
      });
  }

}
