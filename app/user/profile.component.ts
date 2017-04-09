import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService } from "./auth.service";
import {Router} from "@angular/router";
import {Toastr, TOASTR_TOKEN} from "../common/toastr.service";

@Component({
    moduleId: module.id,
    selector: 'selector',
    //note: because this is being used as a child, it doesn't appear to need the full path, perhaps because it is in the same directory as the module?
    templateUrl: 'profile.component.html',
    styles: [`
        em {float:right; color:#E05C65; padding-left:10px;}
        .error input {background-color: #E3C3C5}
        .error ::-webkit-input-placeholder {color: #999}
        .error ::-moz-placeholder {color: #999}
        .error :-moz-placeholder {color: #999}
        .error :ms-input-placeholder {color: #999}
    `]
})
export class ProfileComponent implements OnInit {
    profileForm:FormGroup;
    private firstName:FormControl;
    private lastName:FormControl;
    //lookup the Toastr by its token
    //Toastr is only used for TS
    constructor(private authSvc:AuthService, private router:Router, @Inject(TOASTR_TOKEN) private toastr: Toastr){

    }

    ngOnInit() {
        this.firstName = new FormControl(this.authSvc.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
        this.lastName = new FormControl(this.authSvc.currentUser.lastName, Validators.required);
        this.profileForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName
        })
    }

    validateFirstName(){
        return this.firstName.valid || this.firstName.untouched
    }

    validateLastName(){
        return this.lastName.valid || this.lastName.untouched
    }

    cancel() {
        this.router.navigate(['/events'])
    }

    saveProfile(formValues){
        if (this.profileForm.valid) {
            this.authSvc.updateCurrentUser(formValues.firstName, formValues.lastName);
            this.toastr.success('Profile Saved');
        }

    }

}