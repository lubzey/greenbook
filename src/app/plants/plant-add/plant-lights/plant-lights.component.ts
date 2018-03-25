import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const PLANT_LIGHTS_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PlantLightsComponent),
    multi: true
};

@Component({
    selector: 'plant-lights',
    providers: [PLANT_LIGHTS_ACCESSOR],
    styleUrls: ['plant-lights.component.scss'],
    template: `
    <span class="plant-lights">
      <label
        *ngFor="let light of lights"
        class="plant-light label column"
        [class.plant-light--active]="value.includes(light)">
        <input           
          type="checkbox"
          [attr.name]="light.name"
          [value]="light"
          (blur)="onBlur(light)"
          (change)="updateLight(light)"
          [checked]="value.includes(light)">
      
        <span class="plant-light__icon plant-light__icon--{{ lightIcon(light) }}"></span>
        {{ light | titlecase }}
      </label>
    </span>
  `
})
export class PlantLightsComponent implements ControlValueAccessor {

    private lights = ['Full sun', 'Semi-shade', 'Full shade', 'Filtered light'];
    private lightValues = [
        {key: 'Full sun', value: 'full-sun'},
        {key: 'Semi-shade', value: 'semi-shade'},
        {key: 'Full shade', value: 'full-shade'},
        {key: 'Filtered light', value: 'filtered-light'}        
    ];

    value: string[] = [];

    private onTouch: Function;
    private onModelChange: Function;

    lightIcon(key) {
        return this.lightValues.find(x => x.key == key).value;
    }

    registerOnChange(fn) {
        this.onModelChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouch = fn;
    }

    writeValue(value) {
        this.value = value;
    }

    updateLight(light: string) {
        if (this.value.includes(light)) {
            this.value = this.value.filter((x: string) => light !== x);
        } else {
            this.value = this.value.concat([light]);
        }
        this.onModelChange(this.value);
        console.log(this.value);
    }
}
