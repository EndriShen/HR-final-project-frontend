import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { ManagerListViewComponent } from './pages/manager-list-view/manager-list-view.component';
import { ManagerEditViewComponent } from './pages/manager-edit-view/manager-edit-view.component';
import { AuthGuard } from './guards/auth-guard.service';
import { UnknownUrlComponent } from './pages/unknown-url/unknown-url.component';
import { UserAccess } from './guards/user-access-guard.service';
import { ManagerAccess } from './guards/manager-access-guard.service';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { IsLoggedOut } from './guards/logged-out-guard.guard';

const routes: Routes = [

  { path: 'welcome', component: WelcomePageComponent, canActivate: [IsLoggedOut] },
  { path: 'login', component: LogInComponent, canActivate: [IsLoggedOut]},
  { path: 'signup', component: SignUpComponent, canActivate: [IsLoggedOut]},
  { path: 'user-view', component: UserViewComponent, canActivate: [AuthGuard, UserAccess]},
  { path: 'manager-list', component: ManagerListViewComponent, canActivate: [AuthGuard, ManagerAccess]},
  { path: 'manager-edit/:userId', component: ManagerEditViewComponent, canActivate: [AuthGuard, ManagerAccess]},
  { path: 'about-us', component: AboutUsComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: '**', component: UnknownUrlComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }