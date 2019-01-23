import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './main/home-page/home-page.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { SearchResultComponent } from './main/search-result/search-result.component';
import { AccountRegistrationComponent } from './main/auth/account-registration/account-registration.component';
import { SearchPageComponent } from './main/search-page/search-page.component';
import { UserBookingComponent } from './user/user-booking/user-booking.component';
import { ContactComponent } from './main/contact/contact.component';
import { MyProfileComponent } from './main/my-profile/my-profile.component';
import { OfferPageComponent } from './offer/offer-page.component';
import { PaymentsPageComponent } from './payment/payments-page/payments-page.component';
import { AccountLoginComponent } from './main/auth/account-login/account-login.component';
import { AuthGuard } from './guard/auth.guard';
import { SeatSelectionComponent } from './main/seat-selection/seat-selection.component';
import { SuccessfulPaymentComponent } from './main/successful-payment/successful-payment.component';
import { EditProfileComponent } from './main/edit-profile/edit-profile.component';
import { AboutComponent } from './main/about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'results', component: SearchResultComponent },
  { path: 'registration', component: AccountRegistrationComponent },
  { path: 'login', component: AccountLoginComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'bookings', component: UserBookingComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'profile', component: MyProfileComponent, canActivate: [AuthGuard] },
  { path: 'offer', component: OfferPageComponent },
  { path: 'payments', component: PaymentsPageComponent, canActivate: [AuthGuard] },
  { path: 'selection', component: SeatSelectionComponent, canActivate: [AuthGuard]},
  { path: 'edit_profile', component: EditProfileComponent, canActivate: [AuthGuard]},
  { path: 'success_payment', component: SuccessfulPaymentComponent},
  { path: 'about', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  HomePageComponent, AccountRegistrationComponent
]; exports: [RouterModule]




