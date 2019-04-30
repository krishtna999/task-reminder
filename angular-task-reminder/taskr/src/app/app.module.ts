import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateTaskComponent } from './create-task/create-task.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewTaskComponent } from './view-task/view-task.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { ViewNotificationsComponent } from './view-notifications/view-notifications.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewTaskByUserComponent } from './view-task-by-user/view-task-by-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateTaskComponent,
    ViewTaskComponent,
    RegisterComponent,
    ViewNotificationsComponent,
    DashboardComponent,
    ViewTaskByUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
