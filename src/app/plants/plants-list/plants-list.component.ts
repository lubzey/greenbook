import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PlantService } from '../plant.service';

import { Plant } from '../plant-model';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.scss'],
})
export class PlantsListComponent implements OnInit {
  plants: Observable<Plant[]>;
  newPlant: Plant;


  public types = [
    { value: 'Tree', display: 'Tree' },
    { value: 'Climber', display: 'Climber' },
    { value: 'Shrub', display: 'Shrub' },
    { value: 'Herb', display: 'Herb' },
    { value: 'Ground', display: 'Ground' },
    { value: 'Underground', display: 'Underground' }
  ];

  public lights = [
    { value: 'Full sun', display: 'Full sun <i class="fa fa-sun"></i>' },
    { value: 'Semi-shade', display: 'Semi-shade' },
    { value: 'Full shade', display: 'Full shade' },
    { value: 'Filtered light', display: 'Filtered light' }
  ];

  constructor(private plantService: PlantService) {
    this.newPlant = {
      name: '',
      latinName: '',
      hearts: 0,
      type: ''
    }
  }

  ngOnInit() {
    // this.plants = this.plantService.getData() only loads static data 
    this.plants = this.plantService.getSnapshot();
  }

  createPlant() {
    this.plantService.create(this.newPlant);
    console.log(this.newPlant);

    this.newPlant = {
      name: '',
      latinName: '',
      hearts: 0,
      type: ''
    }
  }
}
