import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatMenuModule, MatToolbarModule, MatButtonModule, MatChipsModule, MatSelectModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatRadioModule, MatCardModule, MatSnackBarModule, MatRippleModule } from '@angular/material';
import { TopNavigationComponent } from './nav/top-navigation/top-navigation.component';
import { BottomNavigationComponent } from './nav/bottom-navigation/bottom-navigation.component';
import { HomePageComponent, DialogOverviewExampleDialog } from './main/home-page/home-page.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { SearchResultComponent } from './main/search-result/search-result.component';
import { BookingCardComponent } from './main/search-result/booking-card/booking-card.component';
import { TimePipe } from './pipes/time.pipe';
import { HourPipe } from './pipes/hour.pipe';
import { AccountRegistrationComponent } from './main/auth/account-registration/account-registration.component';
import { SearchPageComponent } from './main/search-page/search-page.component';
import { UserBookingComponent } from './user/user-booking/user-booking.component';
import { ContactComponent } from './main/contact/contact.component';
import { MyProfileComponent } from './main/my-profile/my-profile.component';
import { OfferPageComponent } from './offer/offer-page.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PaymentsPageComponent } from './payment/payments-page/payments-page.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './store/reducers';
import { environment } from '../environments/environment';
import { DatePipe } from './pipes/date.pipe';
import { AccountLoginComponent } from './main/auth/account-login/account-login.component';
import { AuthGuard } from './guard/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { SeatSelectionComponent } from './main/seat-selection/seat-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavigationComponent,
    BottomNavigationComponent,
    HomePageComponent,
    PageNotFoundComponent,
    routingComponents,
    SearchResultComponent,
    BookingCardComponent,
    TimePipe,
    HourPipe,
    DialogOverviewExampleDialog,
    AccountRegistrationComponent,
    SearchPageComponent,
    UserBookingComponent,
    ContactComponent,
    MyProfileComponent,
    OfferPageComponent,
    PaymentsPageComponent,
    DatePipe,
    AccountLoginComponent,
    SeatSelectionComponent
  ],
  entryComponents: [DialogOverviewExampleDialog],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    MatSnackBarModule,
    MatRippleModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
