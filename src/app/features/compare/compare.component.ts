import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule, X, Plus, Battery, Zap, Weight, Clock, Shield, Star } from 'lucide-angular';
import { VehicleService } from '../../core/services/vehicle.service';
import { LanguageService } from '../../core/services/language.service';
import { Vehicle, BRANDS } from '../../core/models/vehicle.model';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.css'
})
export class CompareComponent implements OnInit {
  readonly X = X;
  readonly Plus = Plus;
  readonly Battery = Battery;
  readonly Zap = Zap;
  readonly Weight = Weight;
  readonly Clock = Clock;
  readonly Shield = Shield;
  readonly Star = Star;
  readonly brands = BRANDS;

  private vehicleService = inject(VehicleService);
  private route = inject(ActivatedRoute);
  public lang = inject(LanguageService);

  selectedVehicles: Vehicle[] = [];
  selectedBrand = '';
  selectedModel = '';
  availableModels: Vehicle[] = [];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const vehicleId = params['vehicleId'];
      if (vehicleId) {
        const vehicle = this.vehicleService.getVehicleById(vehicleId);
        if (vehicle && !this.selectedVehicles.find(v => v.id === vehicle.id)) {
          this.selectedVehicles.push(vehicle);
        }
      }
    });
  }

  onBrandChange() {
    this.selectedModel = '';
    if (this.selectedBrand) {
      this.availableModels = this.vehicleService.getAllVehicles().filter(v => v.brand === this.selectedBrand);
    } else {
      this.availableModels = [];
    }
  }

  handleAddVehicle() {
    if (this.selectedModel) {
      const vehicle = this.vehicleService.getVehicleById(this.selectedModel);
      if (vehicle && !this.selectedVehicles.find(v => v.id === vehicle.id) && this.selectedVehicles.length < 4) {
        this.selectedVehicles.push(vehicle);
        this.selectedBrand = '';
        this.selectedModel = '';
        this.availableModels = [];
      }
    }
  }

  handleRemoveVehicle(id: string) {
    this.selectedVehicles = this.selectedVehicles.filter(v => v.id !== id);
  }

  formatPrice(price: number, priceVND: number): string {
    if (this.lang.language() === 'vi') {
      return priceVND.toLocaleString('vi-VN') + ' ₫';
    }
    return '$' + price.toLocaleString('en-US');
  }
}
