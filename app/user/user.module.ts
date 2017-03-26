import { NgModule} from '@angular/core';
import { CommonModule} from "@angular/common";
import { RouterModule} from "@angular/router";
import { userRoutes } from './user.routes';
import { ProfileComponent} from "./profile.component";
import {LoginComponent} from "./login.component";
import {FormsModule} from '@angular/forms'

@NgModule({
    imports: [
        //common module is a feature/lazy loadable module
        CommonModule,
        FormsModule,
        RouterModule.forChild(userRoutes)
    ],
    exports: [],
    declarations: [
        ProfileComponent,
        LoginComponent
    ],
    providers: [],
})
export class UserModule {
}
