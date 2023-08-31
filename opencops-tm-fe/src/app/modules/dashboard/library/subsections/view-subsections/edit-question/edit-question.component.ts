import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Countermeasures } from 'app/interfaces/countermeasures.types';
import { Questions } from 'app/interfaces/questions.types';
import { AnswersService } from 'app/server-api/answers/answers.service';
import { QuestionsService } from 'app/server-api/questions/questions.service';
import { SectionsService } from 'app/server-api/sections/sections.service';
import { SubsectionsService } from 'app/server-api/subsections/subsections.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent {
  question: Questions
  SectionId: any
  SubsectionId: any
  QuestionId: any;
  updateForm: UntypedFormGroup;
  datasource = new MatTableDataSource<Countermeasures>()
  tableColumns: string[] = ['CountermeasureId', 'CountermeasureName', 'Howto'];
  SurveyQuestions: any;
  selectedFormat: any;
  Answers = []
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private _sectionService: SectionsService,
    private _subsectionService: SubsectionsService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private _questionService: QuestionsService,
    private _answerService: AnswersService
  ) {
    const path = this._router.url.split('?')[0];
    this.SectionId = path.split('/').filter(x => x !== '')[3];
    this.SubsectionId = path.split('/').filter(x => x !== '')[5];
    this.QuestionId = path.split('/').filter(x => x !== '')[6];

  }


  ngOnInit(): void {
    this.SurveyAnswers();
    this.updateForm = this._formBuilder.group({
      SurveyQuestion: [null, [Validators.required]],
      SurveyQuestionDescription: [null, [Validators.required]],
      SurveyQuestionFormat: [null, [Validators.required]],
      Answers: [null],
      SurveyAnswers: [null,]
    });
  }

  SurveyAnswers() {
    this._answerService.Answers(this.SubsectionId, this.QuestionId).subscribe({
      next: (response) => {
        this.question = response;
        this.updateForm = this.UpdateQuestionForm();
        this.selectedFormat = response.SurveyQuestionFormat;
        this.SurveyQuestions = response;
        response.Answers.forEach(element => {
          this.Answers.push(element.SurveyQuestionAnswer)
        });
      },
      error: (error) => {

      }
    })
  }

  addAnswerField(value) {
    if (value) {
      this.Answers.push(value)
      this.updateForm.get("Answers").setValue(null);
    }
  }

  DeleteAnswer(item) {
    this.Answers.splice(item, 1)
  }


  onSelectionChange(value) {
    this.selectedFormat = value
  }


  UpdateQuestionForm(): FormGroup {
    return this._formBuilder.group({
      SurveyQuestion: [this.question.SurveyQuestion],
      SurveyQuestionDescription: [this.question.SurveyQuestionDescription],
      SurveyQuestionFormat: [this.question.SurveyQuestionFormat],
    })
  }

  /**
* Track by function for ngFor loops
*
* @param index
* @param item
*/
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  /**
* On destroy
*/
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  /**
  * After view init
  */
  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }
}
