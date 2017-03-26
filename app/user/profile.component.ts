import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "./auth.service";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'selector',
    //note: because this is being used as a child, it doesn't appear to need the full path, perhaps because it is in the same directory as the module?
    templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {
    profileForm:FormGroup

    constructor(private authSvc:AuthService, private router:Router){

    }

    ngOnInit() {
        let firstName = new FormControl(this.authSvc.currentUser.firstName)
        let lastName = new FormControl(this.authSvc.currentUser.lastName)
        this.profileForm = new FormGroup({
            firstName: firstName,
            lastName: lastName
        })
    }

    cancel() {
        this.router.navigate(['/events'])
    }

    saveProfile(formValues){
        this.authSvc.updateCurrentUser(formValues.firstName, formValues.lastName)
        this.router.navigate(['/events'])

    }

}