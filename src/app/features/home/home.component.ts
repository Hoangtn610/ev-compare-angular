import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowRight, Zap } from 'lucide-angular';
import { VehicleService } from '../../core/services/vehicle.service';
import { LanguageService } from '../../core/services/language.service';
import { VehicleCardComponent } from '../../components/vehicle-card/vehicle-card.component';
import { BRANDS } from '../../core/models/vehicle.model';

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
  readonly brands = BRANDS;

  private vehicleService = inject(VehicleService);
  public lang = inject(LanguageService);

  readonly featuredVehicles = this.vehicleService.getAllVehicles().slice(0, 6);
}
