import { Person } from './person';

export interface Bookings{
    origin: string;
    destination: string;
    departure: string;
    arrival: string;
    type: string;
    agency: string;
    price: number;
    vehicle: {
        model: string;
        plateNumber: string;
        ac: boolean;
    };
    driver: {
        firstName: string;
        lastName: string;
        gender: string;
        dateOfBirth: string;
        email: string;
        contact: number;
    };
    status: string;
    booking: string;
    passengers: Array<Person>;
    payment: boolean;
    selection: Array<number>;
    amount: number;
    order_id: string;
}