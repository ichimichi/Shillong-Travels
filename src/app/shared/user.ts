import { Bookings } from './bookings';

export class User {
    firstName: String;
    lastName: String;
    gender: String;
    dateOfBirth: String;
    phone: Number;
    email: String;
    password: String;
    cpassword: String;
    bookings: Array<Bookings>;
}
