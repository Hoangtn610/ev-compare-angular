import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    private apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {}

    getAllVehicles(): Observable<Vehicle[]> {
        return this.http.get<Vehicle[]>(`${this.apiUrl}/api/vehicles`);
    }

    getVehicleById(id: string): Observable<Vehicle | undefined> {
        return this.http.get<Vehicle>(`${this.apiUrl}/api/vehicles/${id}`).pipe(
            catchError(() => of(undefined))
        );
    }
}
