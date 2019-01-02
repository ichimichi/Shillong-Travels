import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './main/home-page/home-page.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { SearchResultComponent } from './main/search-result/search-result.component';
import { AccountRegistrationComponent } from './main/account-registration/account-registration.component';
import { SearchPageComponent } from './main/search-page/search-page.component';
import { ContactComponent } from './main/contact/contact.component';
import { MyProfileComponent } from './main/my-profile/my-profile.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomePageComponent},
  {path:'results',component:SearchResultComponent},
  {path:'account-registration',component:AccountRegistrationComponent},
  {path:'search',component: SearchPageComponent},
  {path:'contact',component: ContactComponent},
  {path:'my-profile',component: MyProfileComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  HomePageComponent, AccountRegistrationComponent,
];exports: [RouterModule]




