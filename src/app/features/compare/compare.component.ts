import { Component, inject, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortalSelectComponent } from '../../shared/portal-select/portal-select.component';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule, X, Plus, Battery, Zap, Weight, Clock, Shield, Star } from 'lucide-angular';
import { VehicleService } from '../../core/services/vehicle.service';
import { LanguageService } from '../../core/services/language.service';
import { Vehicle } from '../../core/models/vehicle.model';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, PortalSelectComponent],
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

  private vehicleService = inject(VehicleService);
  private route = inject(ActivatedRoute);
  public lang = inject(LanguageService);
  private cdr = inject(ChangeDetectorRef);
  private renderer = inject(Renderer2);
  private host = inject(ElementRef);

  selectedVehicles: Vehicle[] = [];
  selectedBrand = '';
  selectedModel = '';
  availableModels: Vehicle[] = [];
  brands: string[] = [];
  brandsLoading = false;
  brandsLoadError = false;

  ngOnInit() {
    this.loadBrands();

    this.route.queryParams.subscribe(params => {
      const vehicleId = params['vehicleId'];
      if (vehicleId) {
        this.vehicleService.getVehicleById(vehicleId).subscribe(vehicle => {
          if (vehicle && !this.selectedVehicles.find(v => v.id === vehicle.id)) {
            this.selectedVehicles.push(vehicle);
          }
        });
      }
    });
  }

  loadBrands() {
    this.brandsLoading = true;
    this.brandsLoadError = false;
    this.vehicleService.getAllBrandNames().subscribe({
      next: brands => {
        console.log('Compare: loaded brands', brands);
        const normalized = (brands || []).map((b: any) => typeof b === 'string' ? b : (b.name || b.brand || b.displayName || JSON.stringify(b)));
        this.brands = normalized;
        this.brandsLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Compare: failed to load brands', err);
        this.brands = [];
        this.brandsLoading = false;
        this.brandsLoadError = true;
        this.cdr.detectChanges();
      }
    });
    // In case the observable doesn't emit for some reason, also defensively clear loading after 8s
    setTimeout(() => {
      if (this.brandsLoading) {
        console.warn('Compare: brands still loading after timeout, clearing flag');
        this.brandsLoading = false;
        this.brandsLoadError = true;
        this.cdr.detectChanges();
      }
    }, 8000);
  }

  retryLoadBrands() {
    this.loadBrands();
  }

  ngAfterViewInit(): void {
    // Attach focus/blur handlers to native selects to temporarily disable clipping ancestors
    const selects = this.host.nativeElement.querySelectorAll('.js-compare-select');
    selects.forEach((sel: HTMLSelectElement) => {
      const onFocus = () => this._makeAncestorsOverflowVisible(sel);
      const onBlur = () => this._restoreAncestorsOverflow(sel);
      sel.addEventListener('focus', onFocus);
      sel.addEventListener('blur', onBlur);
      // store references for cleanup
      (sel as any).__cmpHandlers = { onFocus, onBlur };
    });
  }

  ngOnDestroy(): void {
    const selects = this.host.nativeElement.querySelectorAll('.js-compare-select');
    selects.forEach((sel: HTMLSelectElement) => {
      const h = (sel as any).__cmpHandlers;
      if (h) {
        sel.removeEventListener('focus', h.onFocus);
        sel.removeEventListener('blur', h.onBlur);
        delete (sel as any).__cmpHandlers;
      }
      this._restoreAncestorsOverflow(sel);
    });
  }

  private _makeAncestorsOverflowVisible(el: HTMLElement) {
    let cur: HTMLElement | null = el.parentElement as HTMLElement | null;
    while (cur && cur !== document.body) {
      const style = window.getComputedStyle(cur);
      if (style.overflow !== 'visible' || style.overflowX !== 'visible' || style.overflowY !== 'visible') {
        // remember original
        if (!cur.hasAttribute('data-original-overflow')) {
          cur.setAttribute('data-original-overflow', JSON.stringify({
            overflow: cur.style.overflow || '',
            overflowX: cur.style.overflowX || '',
            overflowY: cur.style.overflowY || ''
          }));
        }
        this.renderer.setStyle(cur, 'overflow', 'visible');
        this.renderer.setStyle(cur, 'overflowX', 'visible');
        this.renderer.setStyle(cur, 'overflowY', 'visible');
      }
      cur = cur.parentElement as HTMLElement | null;
    }
  }

  private _restoreAncestorsOverflow(el: HTMLElement) {
    let cur: HTMLElement | null = el.parentElement as HTMLElement | null;
    while (cur && cur !== document.body) {
      if (cur.hasAttribute('data-original-overflow')) {
        try {
          const orig = JSON.parse(cur.getAttribute('data-original-overflow') || '{}');
          this.renderer.setStyle(cur, 'overflow', orig.overflow || null);
          this.renderer.setStyle(cur, 'overflowX', orig.overflowX || null);
          this.renderer.setStyle(cur, 'overflowY', orig.overflowY || null);
        } catch {
          this.renderer.removeStyle(cur, 'overflow');
          this.renderer.removeStyle(cur, 'overflowX');
          this.renderer.removeStyle(cur, 'overflowY');
        }
        cur.removeAttribute('data-original-overflow');
      }
      cur = cur.parentElement as HTMLElement | null;
    }
  }

  onBrandChange() {
    this.selectedModel = '';
    if (this.selectedBrand) {
      this.vehicleService.getAllVehiclesByBrand(this.selectedBrand).subscribe(vehicles => {
        this.availableModels = vehicles ?? [];
      });
    } else {
      this.availableModels = [];
    }
  }

  handleAddVehicle() {
    if (this.selectedModel) {
      this.vehicleService.getVehicleById(this.selectedModel).subscribe(vehicle => {
        if (vehicle && !this.selectedVehicles.find(v => v.id === vehicle.id) && this.selectedVehicles.length < 4) {
          this.selectedVehicles.push(vehicle);
          this.selectedBrand = '';
          this.selectedModel = '';
          this.availableModels = [];
        }
      });
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
