import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'selector',
    //note: because this is being used as a child, it doesn't appear to need the full path, perhaps because it is in the same directory as the module?
    templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}