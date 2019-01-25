export interface Order{
    _id:string;
    origin: string;
    destination: string;
    departure: string;
    arrival: string;
    type: string;
    agency: string;
    available: Array<boolean>;
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
}