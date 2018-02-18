import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { PlantService } from './plant.service';

import { PlantsComponent } from './plants.component';
import { PlantAddComponent } from './plant-add/plant-add.component';
import { PlantDetailComponent } from './plant-detail/plant-detail.component';

import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AngularFirestoreModule.enablePersistence(),
  ],
  declarations: [
    PlantsComponent,
    PlantAddComponent,
    PlantDetailComponent,
  ],
  providers: [PlantService],
})
export class PlantsModule { }
