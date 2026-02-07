import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    private vehicles: Vehicle[] = [
        {
            id: 'vinfast-klara-s',
            brand: 'VinFast',
            model: 'Klara S',
            price: 1200,
            priceVND: 28000000,
            image: 'https://images.unsplash.com/photo-1737636255623-42843f3ea30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHNjb290ZXIlMjBtb2Rlcm4lMjBncmVlbnxlbnwxfHx8fDE3Njk4Njk5MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
            range: 80,
            topSpeed: 50,
            batteryCapacity: 1.2,
            chargingTime: 6,
            power: 1.2,
            weight: 95,
            warranty: 3,
            rating: 4.5,
            features: ['Smart Key', 'USB Charging', 'LED Lights', 'Anti-theft System'],
            colors: ['White', 'Red', 'Black', 'Blue'],
            reviews: [
                {
                    id: 'r1',
                    userName: 'Nguyen Van A',
                    userNameVi: 'Nguyễn Văn A',
                    rating: 5,
                    comment: 'Excellent bike, perfect for city commuting!',
                    commentVi: 'Xe rất tốt, hoàn hảo cho di chuyển trong thành phố!',
                    date: '2025-01-15'
                },
                {
                    id: 'r2',
                    userName: 'Tran Thi B',
                    userNameVi: 'Trần Thị B',
                    rating: 4,
                    comment: 'Good quality but a bit expensive.',
                    commentVi: 'Chất lượng tốt nhưng hơi đắt.',
                    date: '2025-01-10'
                }
            ]
        },
        {
            id: 'vinfast-ludo',
            brand: 'VinFast',
            model: 'Ludo',
            price: 850,
            priceVND: 19800000,
            image: 'https://images.unsplash.com/photo-1767990495590-b8fde2270e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMG1vdG9yY3ljbGUlMjB2aWV0bmFtJTIwdXJiYW58ZW58MXx8fHwxNzY5ODY5OTA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
            range: 60,
            topSpeed: 45,
            batteryCapacity: 0.9,
            chargingTime: 5,
            power: 0.8,
            weight: 75,
            warranty: 3,
            rating: 4.2,
            features: ['Lightweight', 'USB Charging', 'LED Lights'],
            colors: ['White', 'Green', 'Orange'],
            reviews: [
                {
                    id: 'r3',
                    userName: 'Le Van C',
                    userNameVi: 'Lê Văn C',
                    rating: 4,
                    comment: 'Great value for money!',
                    commentVi: 'Giá trị tốt cho số tiền bỏ ra!',
                    date: '2025-01-20'
                }
            ]
        },
        {
            id: 'yadea-vigor',
            brand: 'Yadea',
            model: 'Vigor',
            price: 950,
            priceVND: 22000000,
            image: 'https://images.unsplash.com/photo-1669183013495-359f910e0c93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGJpa2UlMjBjaGFyZ2luZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY5ODY5OTA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
            range: 70,
            topSpeed: 55,
            batteryCapacity: 1.4,
            chargingTime: 6,
            power: 1.5,
            weight: 88,
            warranty: 2,
            rating: 4.3,
            features: ['Powerful Motor', 'Fast Charging', 'LCD Display', 'Cruise Control'],
            colors: ['Black', 'Silver', 'Blue'],
            reviews: [
                {
                    id: 'r4',
                    userName: 'Pham Thi D',
                    userNameVi: 'Phạm Thị D',
                    rating: 4,
                    comment: 'Fast and reliable!',
                    commentVi: 'Nhanh và đáng tin cậy!',
                    date: '2025-01-18'
                }
            ]
        },
        {
            id: 'yadea-g5',
            brand: 'Yadea',
            model: 'G5',
            price: 1100,
            priceVND: 25500000,
            image: 'https://images.unsplash.com/photo-1737636255623-42843f3ea30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHNjb290ZXIlMjBtb2Rlcm4lMjBncmVlbnxlbnwxfHx8fDE3Njk4Njk5MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
            range: 85,
            topSpeed: 60,
            batteryCapacity: 1.6,
            chargingTime: 7,
            power: 2.0,
            weight: 92,
            warranty: 2,
            rating: 4.6,
            features: ['Premium Design', 'Smart Display', 'Anti-theft GPS', 'Dual Battery Option'],
            colors: ['White', 'Black', 'Red'],
            reviews: []
        },
        {
            id: 'dibao-xmen-gt',
            brand: 'Dibao',
            model: 'Xmen GT',
            price: 780,
            priceVND: 18000000,
            image: 'https://images.unsplash.com/photo-1767990495590-b8fde2270e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMG1vdG9yY3ljbGUlMjB2aWV0bmFtJTIwdXJiYW58ZW58MXx8fHwxNzY5ODY5OTA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
            range: 65,
            topSpeed: 48,
            batteryCapacity: 1.0,
            chargingTime: 5,
            power: 1.0,
            weight: 82,
            warranty: 2,
            rating: 4.0,
            features: ['Sporty Design', 'LED Lights', 'USB Port'],
            colors: ['Red', 'Black', 'Yellow'],
            reviews: [
                {
                    id: 'r5',
                    userName: 'Hoang Van E',
                    userNameVi: 'Hoàng Văn E',
                    rating: 4,
                    comment: 'Good performance for the price.',
                    commentVi: 'Hiệu suất tốt với mức giá này.',
                    date: '2025-01-12'
                }
            ]
        },
        {
            id: 'pega-newtech',
            brand: 'Pega',
            model: 'Newtech',
            price: 820,
            priceVND: 19000000,
            image: 'https://images.unsplash.com/photo-1669183013495-359f910e0c93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGJpa2UlMjBjaGFyZ2luZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY5ODY5OTA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
            range: 70,
            topSpeed: 50,
            batteryCapacity: 1.1,
            chargingTime: 6,
            power: 1.2,
            weight: 85,
            warranty: 2,
            rating: 4.1,
            features: ['Modern Design', 'Smart Key', 'LED Display'],
            colors: ['White', 'Black', 'Blue'],
            reviews: []
        },
        {
            id: 'dkbike-tl',
            brand: 'DK Bike',
            model: 'TL',
            price: 750,
            priceVND: 17500000,
            image: 'https://images.unsplash.com/photo-1737636255623-42843f3ea30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHNjb290ZXIlMjBtb2Rlcm4lMjBncmVlbnxlbnwxfHx8fDE3Njk4Njk5MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
            range: 60,
            topSpeed: 45,
            batteryCapacity: 0.95,
            chargingTime: 5,
            power: 0.9,
            weight: 78,
            warranty: 2,
            rating: 3.9,
            features: ['Affordable', 'LED Lights', 'Disc Brakes'],
            colors: ['Black', 'Red'],
            reviews: []
        },
        {
            id: 'osakar-elite',
            brand: 'Osakar',
            model: 'Elite',
            price: 890,
            priceVND: 20500000,
            image: 'https://images.unsplash.com/photo-1767990495590-b8fde2270e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMG1vdG9yY3ljbGUlMjB2aWV0bmFtJTIwdXJiYW58ZW58MXx8fHwxNzY5ODY5OTA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
            range: 75,
            topSpeed: 52,
            batteryCapacity: 1.3,
            chargingTime: 6,
            power: 1.4,
            weight: 87,
            warranty: 2,
            rating: 4.2,
            features: ['Premium Build', 'Smart Features', 'LED Lights', 'USB Charging'],
            colors: ['Silver', 'Black', 'White'],
            reviews: [
                {
                    id: 'r6',
                    userName: 'Vu Thi F',
                    userNameVi: 'Vũ Thị F',
                    rating: 4,
                    comment: 'Solid build quality!',
                    commentVi: 'Chất lượng xây dựng tốt!',
                    date: '2025-01-22'
                }
            ]
        }
    ];

    getAllVehicles() {
        return this.vehicles;
    }

    getVehicleById(id: string) {
        return this.vehicles.find(v => v.id === id);
    }
}
