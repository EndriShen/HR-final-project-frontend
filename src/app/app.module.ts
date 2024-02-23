import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserRequestInterceptor } from './interceptors/user-request.interceptor';
import { ManagerListViewComponent } from './pages/manager-list-view/manager-list-view.component';
import { ManagerEditViewComponent } from './pages/manager-edit-view/manager-edit-view.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { UserFilterPipe } from './pipes/user-filter.pipe';
import { UserSortPipe } from './pipes/user-sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    UserViewComponent,
    SignUpComponent,
    ManagerListViewComponent,
    ManagerEditViewComponent,
    HeaderComponent,
    FooterComponent,
    UserFilterPipe,
    UserSortPipe,
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
