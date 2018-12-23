import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import{ ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatMenuModule, MatToolbarModule, MatButtonModule, MatChipsModule, MatSelectModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatRadioModule,} from '@angular/material';
import { TopNavigationComponent } from './nav/top-navigation/top-navigation.component';
import { BottomNavigationComponent } from './nav/bottom-navigation/bottom-navigation.component';
import { HomePageComponent, DialogOverviewExampleDialog } from './main/home-page/home-page.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { SearchResultComponent } from './main/search-result/search-result.component';
import { BookingCardComponent } from './main/search-result/booking-card/booking-card.component';
import { TimePipe } from './pipes/time.pipe';
import { HourPipe } from './pipes/hour.pipe';
import { AccountRegistrationComponent } from './main/account-registration/account-registration.component';
import { SearchPageComponent } from './main/search-page/search-page.component';

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
    SearchPageComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
