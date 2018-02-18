import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

import { PlantService } from '../plant.service';
import { NotifyService } from '../../core/notify.service';

import { Plant } from '../plant-model';

type PlantFields = 'name' | 'latinName' | 'type' | 'light';
type FormErrors = { [u in PlantFields]: string };

@Component({
  selector: 'plant-add',
  templateUrl: './plant-add.component.html',
  styleUrls: ['./plant-add.component.scss']
})
export class PlantAddComponent {
  newPlant: Plant;
  newPlantForm: FormGroup;

  @Output() onHide: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  showPlantAdd: boolean;

  private types = [
    { value: 'Tree', display: 'Tree' },
    { value: 'Climber', display: 'Climber' },
    { value: 'Shrub', display: 'Shrub' },
    { value: 'Herb', display: 'Herb' },
    { value: 'Ground', display: 'Ground' },
    { value: 'Underground', display: 'Underground' }
  ];

  private lights = [
    { value: 'Full sun', display: 'Full sun' },
    { value: 'Semi-shade', display: 'Semi-shade' },
    { value: 'Full shade', display: 'Full shade' },
    { value: 'Filtered light', display: 'Filtered light' }
  ];

  formErrors: FormErrors = {
    'name': '',
    'latinName': '',
    'type': '',
    'light': ''
  };

  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.'
    },
    'latinName': {
      'required': 'Latin name is required.',
      'minlength': 'Latin name must be at least 5 characters long.'
    },
    'type': {
      'required': 'Name is required.'
    },
    'light': {
      'required': 'Name is required.'
    }
  };

  constructor(private fb: FormBuilder,
    private plantService: PlantService,
    private notify: NotifyService) {
    this.createForm();

    this.newPlant = {
      name: '',
      latinName: '',
      hearts: 0,
      type: ''
    }
  }

  createForm() {
    this.newPlantForm = this.fb.group({
      'name': ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]],
      'latinName': ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      'type': ['', [
        Validators.required
      ]],
      'light': ['', [
        Validators.required
      ]]
    });

    this.newPlantForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  onValueChanged(data?: any) {
    if (!this.newPlantForm) { return; }
    const form = this.newPlantForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'name' || field === 'latinName' || field === 'type' || field === 'light')) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                this.formErrors[field] += `${(messages as { [key: string]: string })[key]} `;
              }
            }
          }
        }
      }
    }
  }

  createPlant() {
    console.log(this.newPlantForm.valid);
    this.newPlant = this.newPlantForm.value;
    this.plantService.create(this.newPlant);
    this.hide();
    this.notify.update(this.newPlant.name + ' added successfully!', 'success');
  }

  reset() {
    this.newPlant = {
      name: '',
      latinName: '',
      type: '',
      light: '',
      hearts: 0
    }
  }

  hide() {
    this.onHide.emit();
  }
}
