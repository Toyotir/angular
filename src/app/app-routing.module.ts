import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SocietyListComponent } from './societylist.component';
import { DriverlistComponent } from './driverlist/driverlist.component';
import { CarlistComponent } from './carlist/carlist.component'
import { AuthGuard,Adminguard } from './auth.guard'
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { InvalidComponent } from './invalid/invalid.component';
const routes: Routes = [
  { path: '', redirectTo: 'appComp', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      // { path: '', redirectTo: 'appComp', pathMatch: 'full' },
      { path: 'logout', component: LogoutComponent },
      {
        path:'',
        canActivate:[Adminguard],
        children:[
          { path: 'soc', component: SocietyListComponent },
          { path: 'driver', component: DriverlistComponent },
          { path: 'car', component: CarlistComponent }
        ]
      }
    ]
  },
  { path: 'invalid', component: InvalidComponent }
  //   { path: 'appComp', component:AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

