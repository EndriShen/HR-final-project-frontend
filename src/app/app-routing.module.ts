import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { ManagerListViewComponent } from './pages/manager-list-view/manager-list-view.component';
import { ManagerEditViewComponent } from './pages/manager-edit-view/manager-edit-view.component';

const routes: Routes = [
  { path: 'login', component: LogInComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'user-view', component: UserViewComponent},
  { path: 'manager-list', component: ManagerListViewComponent},
  { path: 'manager-edit/:userId', component: ManagerEditViewComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// {
//   path: 'main',
//   component: MainViewComponent,
//   children: [
//     { path: '', redirectTo: 'main', pathMatch: 'full' },
//     { path: 'user-view', component: UserViewComponent },
//     { path: 'manager-list', component: ManagerListViewComponent },
//     { path: 'manager-edit', component: ManagerEditViewComponent }
//   ]
// },