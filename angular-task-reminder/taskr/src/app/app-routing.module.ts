import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ViewNotificationsComponent } from './view-notifications/view-notifications.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewTaskByUserComponent } from './view-task-by-user/view-task-by-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'view', component: ViewTaskByUserComponent },
  { path: 'create', component: CreateTaskComponent },
  { path: 'dashboard', component: DashboardComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }

