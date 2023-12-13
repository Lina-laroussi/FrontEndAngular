import { LogoutGuard } from "src/app/shared/guards/logout..guard";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { UpdateProfileComponent } from "./update-profile/update-profile.component";
import { AuthGuard } from "src/app/shared/guards/auth.guard";
import { ConfirmationComponent } from "./confirmation/confirmation.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";


const routes: Routes = [
  {path: 'register', component:RegisterComponent,canActivate:[LogoutGuard]},
  {path: 'login', component:LoginComponent,canActivate: [LogoutGuard]},
  {path: 'updateProfile', component:UpdateProfileComponent},
  { path: 'confirm', component: ConfirmationComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
