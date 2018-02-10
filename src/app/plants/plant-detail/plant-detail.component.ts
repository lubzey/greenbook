import { Component, Input } from '@angular/core';

import { PlantService } from '../plant.service';

import { Plant } from '../plant-model';

@Component({
  selector: 'plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.scss'],
})
export class PlantDetailComponent {

  @Input()
  plant: Plant;

  constructor(private plantService: PlantService) { }

  addHeartToPlant(val: number) {
    if (this.plant.id) {
      this.plantService.updatePlant(this.plant.id, { hearts: val + 1 });
    } else {
      console.error('Plant missing ID!');
    }
  }

  deletePlant(id: string) {
    this.plantService.deletePlant(id);
  }

}
