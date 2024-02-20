import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { UserViewComponent } from './pages/main-view/user-view/user-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserRequestInterceptor } from './interceptors/user-request.interceptor';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { ManagerListViewComponent } from './pages/main-view/manager-list-view/manager-list-view.component';
import { ManagerEditViewComponent } from './pages/main-view/manager-edit-view/manager-edit-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    UserViewComponent,
    SignUpComponent,
    MainViewComponent,
    ManagerListViewComponent,
    ManagerEditViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: UserRequestInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
