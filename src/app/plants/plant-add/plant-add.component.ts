import { Component, Input, Output, EventEmitter } from '@angular/core';

import { PlantService } from '../plant.service';

import { Plant } from '../plant-model';

import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private fb: FormBuilder, private plantService: PlantService) {
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
      name: '',
      latinName: '',
      type: '',
      light: '',
      hearts: 0
    });
  }

  createPlant() {
    this.newPlant = this.newPlantForm.value;
    console.log(this.newPlant);

    this.plantService.create(this.newPlant);
    this.reset();
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
