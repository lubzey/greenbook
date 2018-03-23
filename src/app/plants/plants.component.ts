import { Component, OnInit } from '@angular/core';

import { PlantService } from './plant.service';

import { Plant } from './plant-model';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss']  
})
export class PlantsComponent implements OnInit {
  plants: Observable<Plant[]>;
  showPlantAdd: boolean;

  constructor(private plantService: PlantService) {    
  }

  ngOnInit() {
    // this.plants = this.plantService.getData() only loads static data 
    this.plants = this.plantService.getSnapshot();
    this.showPlantAdd = false;
  }

  toggleNewPlant() {
    this.showPlantAdd = !this.showPlantAdd;
  }
}