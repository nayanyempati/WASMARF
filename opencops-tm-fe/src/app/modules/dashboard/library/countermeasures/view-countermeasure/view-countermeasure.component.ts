import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CounterMeasureWeakness } from 'app/interfaces/countermeasureWeakness.types';
import { Countermeasures } from 'app/interfaces/countermeasures.types';
import { Weakness } from 'app/interfaces/weakness.types';
import { CountermeasuresService } from 'app/server-api/countermeasures/countermeasures.service';
import { PhasesService } from 'app/server-api/phases/phases.service';
import { WeaknessService } from 'app/server-api/weakness/weakness.service';

@Component({
  selector: 'app-view-countermeasure',
  templateUrl: './view-countermeasure.component.html',
  styleUrls: ['./view-countermeasure.component.scss']
})
export class ViewCountermeasureComponent {
  CounterMeasureWeakness: CounterMeasureWeakness
  CountermeasureId: any;
  counterMeasureForm: FormGroup;
  Priorities = [
    { value: 10, label: '10 - High Priority' },
    { value: 9, label: '9' },
    { value: 8, label: '8' },
    { value: 7, label: '7' },
    { value: 6, label: '6' },
    { value: 5, label: '5 - Medium Priority' },
    { value: 4, label: '4' },
    { value: 3, label: '3' },
    { value: 2, label: '2' },
    { value: 1, label: '1 - Low Priority' }
  ]
  Phases:[]
  @ViewChild('autoSizeTextarea', { read: ElementRef }) autoSizeTextarea: ElementRef;
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private _countermeasuresService: CountermeasuresService,
    private _weaknessService: WeaknessService,
    private _phasesServices: PhasesService,
  ) {
    const path = this._router.url.split('?')[0];
    this.CountermeasureId = path.split('/').filter(x => x !== '')[3];

  }

  ngOnInit(): void {
    this.Details();
    this.PhasesList();
    this.counterMeasureForm = this._formBuilder.group({
      CountermeasureName: [null, [Validators.required]],
      CountermeasureSolution: [null, [Validators.required]],
      CountermeasurePriority: ['1', [Validators.required]],
      Phase: [null, [Validators.required]],
    });
  }


  Details() {
    this._countermeasuresService.Details(this.CountermeasureId).subscribe({
      next: (response) => {
        this.CounterMeasureWeakness = response;
        this.counterMeasureForm.get('CountermeasurePriority').setValue('1');
        this.counterMeasureForm = this.UpdateCountermeasureForm()
      }
    })
  }

  UpdateCountermeasureForm(): FormGroup {
    return this._formBuilder.group({
      CountermeasureName: [this.CounterMeasureWeakness.CountermeasureName],
      CountermeasureSolution: [this.CounterMeasureWeakness.CountermeasureSolution],
      CountermeasurePriority: [this.CounterMeasureWeakness.CountermeasurePriority],
      Phase: [this.CounterMeasureWeakness.Phase],
    })
  }

  PhasesList() {
    this._phasesServices.Phases().subscribe({
     next: (response) => {
      this.Phases=response;
     }
    })
   }

  updateCountermeasure(){
    
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


}
