import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Weakness } from 'app/interfaces/weakness.types';
import { CountermeasuresService } from 'app/server-api/countermeasures/countermeasures.service';
import { WeaknessService } from 'app/server-api/weakness/weakness.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, map, startWith } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Countermeasures } from 'app/interfaces/countermeasures.types';
import { CounterMeasureWeakness } from 'app/interfaces/countermeasureWeakness.types';
import { CategoryService } from 'app/server-api/category/category.service';
@Component({
  selector: 'app-view-weakness',
  templateUrl: './view-weakness.component.html',
  styleUrls: ['./view-weakness.component.scss']
})
export class ViewWeaknessComponent {
  weakness: Weakness
  weaknessForm: FormGroup
  weaknessid: any
  Categories:any
  RiskRatings = [
    { value: 10, label: '10 - High Risk' },
    { value: 9, label: '9' },
    { value: 8, label: '8' },
    { value: 7, label: '7' },
    { value: 6, label: '6' },
    { value: 5, label: '5 - Medium Priority' },
    { value: 4, label: '4' },
    { value: 3, label: '3' },
    { value: 2, label: '2' },
    { value: 1, label: '1 - Low Risk' }
  ];
  announcer = inject(LiveAnnouncer);
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  countermeasureCtrl = new FormControl('');
  filteredCountermeasure: Observable<string[]>;
  selectedCountermeasures: any[] = [];
  countermeasures = [
  ];

  @ViewChild('countermeasureInput') countermeasureInput: ElementRef<HTMLInputElement>;
  constructor(private _weaknessService: WeaknessService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _countermeasuresService: CountermeasuresService,
    private _CategoryService: CategoryService
  ) {
    this.WeaknessCategories();
    const path = this._router.url.split('?')[0];
    this.weaknessid = path.split('/').filter(x => x !== '')[3];

    this.filteredCountermeasure = this.countermeasureCtrl.valueChanges.pipe(
      startWith(null),
      map((countermeasure: string | null) =>
        countermeasure ? this._filter(countermeasure) : this.countermeasures.map(item => item.CountermeasureName)
      )
    );
  }
  ngOnInit(): void {
 
    this.WeaknessDetails();
    this.ListCountermeasures();
    this.ListCountermeasureByWeaknessId();
    this.weaknessForm = this._formBuilder.group({
      WeaknessName: [null, [Validators.required]],
      WeaknessDescription: [null, [Validators.required]],
      WeaknessRiskRating: [null, [Validators.required]],
      WeaknessCwes: [null],
      WeaknessCategory: [null, [Validators.required]],
    });
  }

  add(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    if (value) {
      const selectedCountermeasure = this.countermeasures.find(
        (countermeasure) => countermeasure.CountermeasureName === value
      );
      this.selectedCountermeasures.push(selectedCountermeasure);
    }
    this.countermeasureInput.nativeElement.value = '';
    this.countermeasureCtrl.setValue(null);
  }

  remove(countermeasure: any): void {
    const index = this.selectedCountermeasures.indexOf(countermeasure);
    if (index >= 0) {
      this.selectedCountermeasures.splice(index, 1);
      this.announcer.announce(`Removed ${countermeasure.CountermeasureName}`);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countermeasures
      .map(item => item.CountermeasureName)
      .filter((countermeasureName) => countermeasureName.toLowerCase().includes(filterValue));
  }

  WeaknessCategories() {
    this._CategoryService.Categories().subscribe({
      next: (response) => {
        this.Categories=response
      }
    })
  }


  WeaknessDetails() {
    this._weaknessService.Details(this.weaknessid).subscribe({
      next: (response) => {
        this.weakness = response;
        this.weaknessForm = this.UpdateWeaknessForm()
      }
    })
  }

  UpdateWeaknessForm(): FormGroup {
    return this._formBuilder.group({
      WeaknessName: [this.weakness.WeaknessName],
      WeaknessDescription: [this.weakness.WeaknessDescription],
      WeaknessRiskRating: [this.weakness.WeaknessRiskRating],
      WeaknessCwes: [this.weakness.WeaknessCwes],
      WeaknessCategory: [this.weakness.WeaknessCategory]
    })
  }

  ListCountermeasureByWeaknessId() {
    this._countermeasuresService.ListCountermeasuresByWeaknessId(this.weaknessid).subscribe({
      next: (response) => {
        this.selectedCountermeasures = response;
      }
    })
  }

  ListCountermeasures() {
    this._countermeasuresService.Countermeasures().subscribe({
      next: (response) => {
        this.countermeasures = response;
      }
    })
  }


  updateWeakness() {

  }

}
