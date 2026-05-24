import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowRight, Zap } from 'lucide-angular';
import { VehicleService } from '../../core/services/vehicle.service';
import { LanguageService } from '../../core/services/language.service';
import { VehicleCardComponent } from '../../components/vehicle-card/vehicle-card.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, VehicleCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly ArrowRight = ArrowRight;
  readonly Zap = Zap;

  private vehicleService = inject(VehicleService);
  public lang = inject(LanguageService);

  readonly brands$ = this.vehicleService.getAllBrandNames();

  readonly featuredVehicles$ = this.vehicleService.getAllVehicles().pipe(
    map(vehicles => vehicles.slice(0, 6))
  );
}
