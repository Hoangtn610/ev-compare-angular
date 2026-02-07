export interface Vehicle {
    id: string;
    brand: string;
    model: string;
    price: number;
    priceVND: number;
    image: string;
    range: number; // km
    topSpeed: number; // km/h
    batteryCapacity: number; // kWh
    chargingTime: number; // hours
    power: number; // kW
    weight: number; // kg
    warranty: number; // years
    rating: number;
    reviews: Review[];
    features: string[];
    colors: string[];
}

export interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
    userNameVi?: string;
    commentVi?: string;
}

export const BRANDS = [
    'VinFast',
    'Yadea',
    'Dibao',
    'Pega',
    'DK Bike',
    'Osakar'
];
