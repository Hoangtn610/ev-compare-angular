import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PageResult, Vehicle, VehicleFilters } from '../models/vehicle.model';
import { environment } from '../../../environments/environment';



@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAllVehicles(): Observable<Vehicle[]> {
        return this.http.get<Vehicle[]>(`${this.apiUrl}/api/vehicles`);
    }

    getVehicleById(id: string): Observable<Vehicle | undefined> {
        return this.http.get<Vehicle>(`${this.apiUrl}/api/vehicles/${id}`).pipe(
            catchError(() => of(undefined))
        );
    }

    getAllVehiclesByBrand(brandName: string): Observable<Vehicle[] | undefined> {
        return this.http.get<Vehicle[]>(`${this.apiUrl}/api/vehicles/brand?brandName=${brandName}`).pipe(
            catchError(() => of(undefined))
        );
    }

    getAllBrandNames(): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/api/brands`).pipe(
            catchError(() => of([]))
        );
    }

    getFilteredVehicles(filters: VehicleFilters): Observable<PageResult<Vehicle>> {
        // Add default pagination if not provided
        const paginationFilters = {
            ...filters,
            page: filters.page || 1,
            limit: filters.limit || 12
        };
        return this.http.post<PageResult<Vehicle>>(`${this.apiUrl}/api/vehicles/filter`, paginationFilters);
    }
}
