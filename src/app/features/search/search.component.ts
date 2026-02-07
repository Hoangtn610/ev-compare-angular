import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LucideAngularModule, Search, SlidersHorizontal, X } from 'lucide-angular';
import { VehicleService } from '../../core/services/vehicle.service';
import { LanguageService } from '../../core/services/language.service';
import { VehicleCardComponent } from '../../components/vehicle-card/vehicle-card.component';
import { Vehicle, BRANDS } from '../../core/models/vehicle.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, VehicleCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  readonly SearchIcon = Search;
  readonly SlidersHorizontal = SlidersHorizontal;
  readonly X = X;
  readonly brands = BRANDS;

  private vehicleService = inject(VehicleService);
  private route = inject(ActivatedRoute);
  private router = inject(Router); // Not used directly in this snippet but good to have
  public lang = inject(LanguageService);

  searchQuery = '';
  selectedBrand = '';
  priceRange: [number, number] = [0, 1500];
  rangeKm: [number, number] = [0, 100];
  showFilters = false;

  allVehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];

  ngOnInit() {
    this.allVehicles = this.vehicleService.getAllVehicles();
    this.filteredVehicles = this.allVehicles;

    // Check query params for initial brand
    this.route.queryParams.subscribe(params => {
      if (params['brand']) {
        this.selectedBrand = params['brand'];
        this.showFilters = true;
        this.applyFilters();
      }
    });
  }

  applyFilters() {
    let results = this.allVehicles;

    // Search query
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      results = results.filter(v =>
        v.brand.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.features.some(f => f.toLowerCase().includes(q))
      );
    }

    // Brand
    if (this.selectedBrand) {
      results = results.filter(v => v.brand === this.selectedBrand);
    }

    // Price
    results = results.filter(v => v.price >= this.priceRange[0] && v.price <= this.priceRange[1]);

    // Range
    results = results.filter(v => v.range >= this.rangeKm[0] && v.range <= this.rangeKm[1]);

    this.filteredVehicles = results;
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedBrand = '';
    this.priceRange = [0, 1500];
    this.rangeKm = [0, 100];
    this.applyFilters();
  }

  formatPrice(price: number): string {
    if (this.lang.language() === 'vi') {
      return (price * 23300).toLocaleString('vi-VN') + ' ₫';
    }
    return '$' + price.toLocaleString('en-US');
  }
}
