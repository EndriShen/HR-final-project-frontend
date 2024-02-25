import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { ManagerListViewComponent } from './pages/manager-list-view/manager-list-view.component';
import { ManagerEditViewComponent } from './pages/manager-edit-view/manager-edit-view.component';
import { AuthGuard, AuthGuardService } from './guards/auth-guard.service';
import { UnknownUrlComponent } from './pages/unknown-url/unknown-url.component';
import { UserAccessGuardService, UserAccess } from './guards/user-access-guard.service';
import { ManagerAccessGuardService, ManagerAccess } from './guards/manager-access-guard.service';

const routes: Routes = [
  { path: 'login', component: LogInComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'user-view', component: UserViewComponent, canActivate: [AuthGuard, UserAccess]},
  { path: 'manager-list', component: ManagerListViewComponent, canActivate: [AuthGuard, ManagerAccess]},
  { path: 'manager-edit/:userId', component: ManagerEditViewComponent, canActivate: [AuthGuard, ManagerAccess]},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', component: UnknownUrlComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }