import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LucideAngularModule, Search, SlidersHorizontal, X } from 'lucide-angular';
import { VehicleService } from '../../core/services/vehicle.service';
import { LanguageService } from '../../core/services/language.service';
import { VehicleCardComponent } from '../../components/vehicle-card/vehicle-card.component';
import { Vehicle } from '../../core/models/vehicle.model';

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

  private vehicleService = inject(VehicleService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router); // Not used directly in this snippet but good to have
  public lang = inject(LanguageService);

  searchQuery = '';
  selectedBrand = '';
  priceRange: [number, number] = [0, 1500];
  rangeKm: [number, number] = [0, 100];
  showFilters = false;

  brands: string[] = [];
  filteredVehicles: Vehicle[] = [];
  paginatedVehicles: Vehicle[] = [];
  isLoading = false;
  private vehiclesLoaded = false;

  // Pagination properties
  currentPage = 1;
  itemsPerPage = 12;
  totalElements = 0;
  totalPages = 0;

  ngOnInit() {
    this.loadBrands();

    // Check query params for initial brand
    this.route.queryParams.subscribe(params => {
      if (params['brand']) {
        this.selectedBrand = params['brand'];
        this.showFilters = true;
      }
      this.loadFilteredVehicles();
    });
  }

  loadBrands() {
    this.vehicleService.getAllBrandNames().subscribe(brands => {
      this.brands = brands;
      this.cdr.detectChanges();
    });
  }

  loadFilteredVehicles(page: number = 1) {
    this.isLoading = true;

    const filters = {
      searchQuery: this.searchQuery || undefined,
      brand: this.selectedBrand || undefined,
      minPrice: this.priceRange[0],
      maxPrice: this.priceRange[1],
      minRange: this.rangeKm[0],
      maxRange: this.rangeKm[1],
      page: page,
      limit: this.itemsPerPage
    };

    this.vehicleService.getFilteredVehicles(filters).subscribe(response => {
      // Handle paginated response from backend
      this.paginatedVehicles = response.content;
      this.filteredVehicles = response.content;
      this.currentPage = response.page;
      this.itemsPerPage = response.limit;
      this.totalElements = response.totalElements;
      this.totalPages = response.totalPages;
      this.isLoading = false;
      this.vehiclesLoaded = true;
      this.cdr.detectChanges();
    }, () => {
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  onSearch() {
    this.loadFilteredVehicles(1);
  }

  onSearchKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  onBrandChange(brand: string) {
    this.selectedBrand = brand;
    this.loadFilteredVehicles(1);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadFilteredVehicles(this.currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.loadFilteredVehicles(this.currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.loadFilteredVehicles(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  applyFilters() {
    this.loadFilteredVehicles(1);
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedBrand = '';
    this.priceRange = [0, 1500];
    this.rangeKm = [0, 100];
    this.totalElements = 0;
    this.loadFilteredVehicles(1);
  }

  formatPrice(price: number): string {
    if (this.lang.language() === 'vi') {
      return (price * 23300).toLocaleString('vi-VN') + ' ₫';
    }
    return '$' + price.toLocaleString('en-US');
  }
}
