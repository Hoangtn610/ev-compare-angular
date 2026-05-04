export interface Vehicle {
    id: string;
    brand: string; // => ok
    model: string; // => OK
    price: number; // => OK
    priceVND: number; // => OK
    image: string; // => OK
    range: number; // km
    topSpeed: number; // km/h => OK
    batteryCapacity: number; // kWh => OK
    chargingTime: number; // hours => OK
    power: number; // kW => OK
    weight: number; // kg // => OK
    warranty: number; // years // => OK
    rating: number; // => OK
    reviews: Review[]; // => OK
    features: string[]; // => OK
    colors: string[]; // => OK
    length: number; // => OK
    width: number;// => OK
    height: number;// => OK
    trunkCapacity: number; // => OK
}

// chargeType => OK
// battery weight => OK
// Range per charge => OK
// length // => OK
// width// => OK
// height// => OK
// trunk capacity => OK

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
