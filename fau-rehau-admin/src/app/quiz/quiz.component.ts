import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {}

  onSubmit(f: NgForm) {
    const question = {
      'questionDE': f.value.questionDE,
      'contextDE': f.value.contextDE,
      'answersDE': [
        {
          answer: f.value.aDE,
          correct: f.value.correct === 'a' ? true : false,
          selected: false
        },
        {
          answer: f.value.bDE,
          correct: f.value.correct === 'b' ? true : false,
          selected: false
        },
        {
          answer: f.value.cDE,
          correct: f.value.correct === 'c' ? true : false,
          selected: false
        }
      ],
      'questionEN': f.value.questionEN,
      'contextEN': f.value.contextEN,
      'answersEN': [
        {
          answer: f.value.aEN,
          correct: f.value.correct === 'a' ? true : false,
          selected: false
        },
        {
          answer: f.value.bEN,
          correct: f.value.correct === 'b' ? true : false,
          selected: false
        },
        {
          answer: f.value.cEN,
          correct: f.value.correct === 'c' ? true : false,
          selected: false
        }
      ],
      points: f.value.points
    };
    this.dataService.pushQuiz(question).subscribe(
      success => {
        alert('Success!');
        this.router.navigateByUrl('/dashboard');
      },
      error => {
        alert('There was an Error: ' + error);
      }
    );
  }
}
