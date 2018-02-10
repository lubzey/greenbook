import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { PlantService } from './plant.service';

import { PlantsListComponent } from './plants-list/plants-list.component';
import { PlantDetailComponent } from './plant-detail/plant-detail.component';

import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AngularFirestoreModule.enablePersistence(),
  ],
  declarations: [
    PlantsListComponent,
    PlantDetailComponent,
  ],
  providers: [PlantService],
})
export class PlantsModule { }
