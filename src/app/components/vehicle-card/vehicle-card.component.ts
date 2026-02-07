import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Vehicle } from '../../core/models/vehicle.model';
import { LanguageService } from '../../core/services/language.service';

@Component({
    selector: 'app-vehicle-card',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="h-full rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div class="relative aspect-[4/3] overflow-hidden">
        <img [src]="vehicle.image" [alt]="vehicle.brand + ' ' + vehicle.model" class="object-cover w-full h-full transition-transform hover:scale-105" loading="lazy" />
        <div class="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
          {{ vehicle.brand }}
        </div>
      </div>
      
      <div class="p-4 flex flex-col flex-grow">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h3 class="font-semibold text-lg leading-none tracking-tight">{{ vehicle.brand }} {{ vehicle.model }}</h3>
            <p class="text-sm text-muted-foreground mt-1">{{ vehicle.features[0] }}</p>
          </div>
          <div class="text-right">
            <div class="font-bold text-lg text-primary">
              {{ vehicle.priceVND | currency:'VND':'symbol':'1.0-0' }}
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2 text-sm text-muted-foreground my-4">
          <div class="flex items-center gap-1">
            <span class="font-medium">{{ lang.translate('card.range') }}:</span>
            <span>{{ vehicle.range }} {{ lang.translate('common.km') }}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="font-medium">{{ lang.translate('card.topSpeed') }}:</span>
            <span>{{ vehicle.topSpeed }} {{ lang.translate('common.kmh') }}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="font-medium">{{ lang.translate('compare.battery') }}:</span>
            <span>{{ vehicle.batteryCapacity }} {{ lang.translate('common.kw') }}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="font-medium">{{ lang.translate('compare.charging') }}:</span>
            <span>{{ vehicle.chargingTime }}h</span>
          </div>
        </div>

        <div class="mt-auto flex gap-2">
          <a [routerLink]="['/detail', vehicle.id]" class="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            {{ lang.translate('card.viewDetails') }}
          </a>
          <!-- Compare functionality can be added here later -->
        </div>
      </div>
    </div>
  `
})
export class VehicleCardComponent {
    @Input({ required: true }) vehicle!: Vehicle;

    constructor(public lang: LanguageService) { }
}
