import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Battery, Zap, Weight, Clock, Shield, Star, DollarSign } from 'lucide-angular';
import { VehicleService } from '../../core/services/vehicle.service';
import { LanguageService } from '../../core/services/language.service';
import { Vehicle } from '../../core/models/vehicle.model';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  // Icons
  readonly ArrowLeft = ArrowLeft;
  readonly Battery = Battery;
  readonly Zap = Zap;
  readonly Weight = Weight;
  readonly Clock = Clock;
  readonly Shield = Shield;
  readonly Star = Star;
  readonly DollarSign = DollarSign;

  private route = inject(ActivatedRoute);
  private vehicleService = inject(VehicleService);
  public lang = inject(LanguageService);

  vehicle?: Vehicle;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.vehicle = this.vehicleService.getVehicleById(id);
      }
    });
  }

  formatPrice(price: number, priceVND: number): string {
    if (this.lang.language() === 'vi') {
      return priceVND.toLocaleString('vi-VN') + ' ₫';
    }
    return '$' + price.toLocaleString('en-US');
  }
}
