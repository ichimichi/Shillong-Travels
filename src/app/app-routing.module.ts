import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './main/home-page/home-page.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { SearchResultComponent } from './main/search-result/search-result.component';
import { SearchPageComponent } from './main/search-page/search-page.component';
import { AccountRegistrationComponent } from './main/account-registration/account-registration.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomePageComponent},
  {path:'results',component:SearchResultComponent},
  {path: 'search', component: SearchPageComponent},
  {path:'account-registration',component:AccountRegistrationComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  HomePageComponent, AccountRegistrationComponent,
];