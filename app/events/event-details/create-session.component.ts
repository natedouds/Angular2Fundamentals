import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import {ISession} from "../shared/event.model";

@Component({
    moduleId: module.id,
    selector: 'selector',
    templateUrl: 'create-session.component.html',
    styles: [`
        em {float:right; color:#E05C65; padding-left:10px;}
        .error input, .error select, .error textarea {background-color: #E3C3C5}
        .error ::-webkit-input-placeholder {color: #999}
        .error ::-moz-placeholder {color: #999}
        .error :-moz-placeholder {color: #999}
        .error :ms-input-placeholder {color: #999}
    `]
})

export class CreateSessionComponent implements OnInit {

    newSessionForm: FormGroup
    name: FormControl
    presenter: FormControl
    duration: FormControl
    level: FormControl
    abstract: FormControl

    ngOnInit(): void {
        this.name = new FormControl('', Validators.required)
        this.presenter = new FormControl('', Validators.required)
        this.duration = new FormControl('', Validators.required)
        this.level = new FormControl('', Validators.required)
        //note: the validators array is just a list of functions that should be run to validate the control
        this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), this.restrictedWords(['foo', 'bar'])])

        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract
        })
    }

    saveSession(formValues) {
        //remap to existing model for type safety
        let session:ISession = {
            id: undefined,
            name: formValues.name,
            duration: +formValues.duration, //cast to int
            level: formValues.level,
            presenter: formValues.presenter,
            abstract: formValues.abstract,
            voters: []
        }
    }

    //custom validator, returns null if valid or error object if not valid
    //restricted words is a function that returns a function, and that returned function is our validator
    private restrictedWords(words) {
        return (control: FormControl): { [key: string]: any } =>
        {
            //no validation if words is empty
            if (!words) return null;

            //loop over all keywords and check if control contains that word, return word, otherwise return null
            //then filter out the nulls
            var invalidWords = words.map(w => control.value.includes(w) ? w : null)
                .filter(w => w != null);

            //if the control's value contains the word 'foo', then it is invalid and we'll return an object with a restrictedWords property
            // the returned error object typically has a key that matches the validator name (i.e. the name of the function)
            return invalidWords && invalidWords.length > 0
                ? {'restrictedWords': invalidWords.join(', ')}
                : null
        }
    }

}