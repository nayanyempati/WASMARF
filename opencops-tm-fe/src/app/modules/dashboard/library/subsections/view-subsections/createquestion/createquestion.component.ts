import { Component } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subsections } from 'app/interfaces/subsections.types';
import { QuestionsService } from 'app/server-api/questions/questions.service';
import { SectionsService } from 'app/server-api/sections/sections.service';
import { SubsectionsService } from 'app/server-api/subsections/subsections.service';

@Component({
  selector: 'app-createquestion',
  templateUrl: './createquestion.component.html',
  styleUrls: ['./createquestion.component.scss']
})
export class CreatequestionComponent {
  subsection: Subsections
  SubsectionId: any;
  SectionId: any;
  addForm: UntypedFormGroup;
  questionsCount: number = 0;
  selectedFormat = 'Multiple'
  Answers = []
  constructor(
    private _sectionService: SectionsService,
    private _subsectionService: SubsectionsService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private _questionService:QuestionsService
  ) {
    const path = this._router.url.split('?')[0];
    this.SectionId = path.split('/').filter(x => x !== '')[3];
    this.SubsectionId = path.split('/').filter(x => x !== '')[5];
  }

  ngOnInit(): void {
    this.Subsection();
    this.addForm = this._formBuilder.group({
      SurveyQuestion: [null, [Validators.required]],
      SurveyQuestionDescription: [null, [Validators.required]],
      SurveyQuestionFormat: ['Multiple', [Validators.required]],
      Answers: [null],
      SurveyAnswers: [null,]
    });
  }

  Subsection() {
    this._subsectionService.ViewSubsection(this.SectionId, this.SubsectionId).subscribe({
      next: (response) => {
        this.subsection = response;
      }
    })
  }


  onSelectionChange(value) {
    this.selectedFormat = value
  }

  addAnswerField(value) {
    if (value) {
      this.Answers.push(value)
      this.addForm.get("Answers").setValue(null);
    }
  }

  DeleteAnswer(i) {
    this.Answers.splice(i, 1)
  }

  CreateQuestion() {
    this.addForm.get("SurveyAnswers").setValue(this.Answers);
    const surveyAnswer = this.addForm.get("SurveyAnswers").value;
    if (!surveyAnswer[0]) {
      this._matSnackBar.open("You need at least one answer.", 'End now', {
        panelClass: 'snack-warning',
        duration: 1500,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      return;
    }
    if (!this.addForm.valid) {
      return
    }

    this._questionService.CreateQuestionAnswer(this.addForm.value, this.SubsectionId).subscribe({
      next: (response) => {
        if (response.Status == "Success") {
          this._matSnackBar.open(response.Message, 'End now', {
            panelClass: 'snack-success',
            duration:2000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this._router.navigate(['/dashboard/library/profiles'])
        }else{
          this.addForm.enable();
          this._matSnackBar.open(response.Message, 'End now', {
            panelClass: 'snack-warning',
            duration:2000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      },
      error: (error) => {
        this.addForm.enable();
        this._matSnackBar.open("Something went wrong", 'End now', {
          panelClass: 'snack-error',
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    })

  }
}


