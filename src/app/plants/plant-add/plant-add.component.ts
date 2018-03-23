import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

import { PlantService } from '../plant.service';
import { NotifyService } from '../../core/notify.service';

import { Plant } from '../plant-model';

type PlantFields = 'name' | 'latinName' | 'layer' | 'light';
type FormErrors = { [u in PlantFields]: string };

@Component({
  selector: 'plant-add',
  templateUrl: './plant-add.component.html',
  styleUrls: ['./plant-add.component.scss']
})
export class PlantAddComponent {
  newPlant: Plant;
  newPlantForm: FormGroup;
  selectedLights: string[] = [];

  @Output() onHide: EventEmitter<any> = new EventEmitter<any>();

  private layers = [
    { value: 'Tree', display: 'Tree' },
    { value: 'Shrub', display: 'Shrub' },    
    { value: 'Vine', display: 'Vine' },
    { value: 'Herb', display: 'Herb' },
    { value: 'Ground', display: 'Ground' },
    { value: 'Underground', display: 'Underground' },
    { value: 'Aquatic', display: 'Aquatic' }
  ];

  private lights = [
    { value: 'Full sun', icon: 'full-sun' },
    { value: 'Semi-shade', icon: 'semi-shade' },
    { value: 'Full shade', icon: 'full-shade' },
    { value: 'Filtered light', icon: 'filtered-light' }
  ];

  formErrors: FormErrors = {
    'name': 'Name is required',
    'latinName': 'L is required',
    'layer': 'Layer',
    'light': 'Light'
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
    'layer': {
      'required': 'Layer is required.'
    },
    'light': {
      'required': 'Light is required.'
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
      layer: '',
      light: this.selectedLights
    }
  }

  createForm() {
    this.newPlantForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]],
      latinName: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      layer: ['', [
        Validators.required
      ]],
      light: [[]]
    });

    this.newPlantForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  onValueChanged(data?: any) {
    if (!this.newPlantForm) { return; }
    const form = this.newPlantForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'name' || field === 'latinName' || field === 'layer' || field === 'light')) {
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
    console.log(this.newPlantForm.value);
    console.log(this.newPlantForm.valid);
    this.newPlant = this.newPlantForm.value;
    this.plantService.create(this.newPlant);
    this.hide();
    this.notify.update(this.newPlant.name + ' added successfully!', 'success');
  }

  reset() {
    this.selectedLights = [];

    this.newPlant = {
      name: '',
      latinName: '',
      layer: '',
      hearts: 0
    }
  }

  hide() {
    this.onHide.emit();
  }


  focused: string;

  private onTouch: Function;






  updateLight(light: string) {
    if (this.selectedLights.includes(light)) {
      this.selectedLights = this.selectedLights.filter((x: string) => light !== x);
    } else {
      this.selectedLights = this.selectedLights.concat(light);
    }
    
    this.newPlant.light = this.selectedLights;
    console.log(this.selectedLights);
  }
}
