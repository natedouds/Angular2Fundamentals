import {Directive} from "@angular/core";
import {FormGroup, Validator, NG_VALIDATORS} from "@angular/forms";

@Directive({
    selector: '[validateLocation]',
    //every component has its own injector; here you're essentially saying LocationValidator should be added to the NG_VALIDATORS and not overwrite existing, but add because of the 'multi'
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: LocationValidator,
        multi: true
    }]
})
//note: this needs to be added to angular's list of validators, needs to be added to NG_VALIDATORS (Opaque token)
export class LocationValidator implements Validator {
    validate(formGroup: FormGroup): { [key: string]: any } {
        let addressControl = formGroup.controls['address'];      //indexer syntax for TS
        let cityControl = formGroup.controls['city'];
        let countryControl = formGroup.controls['country'];
        let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl']; //need to go up

        if ((addressControl && addressControl.value && cityControl && cityControl.value && countryControl && countryControl.value) || (onlineUrlControl && onlineUrlControl.value)) {
            return null; //tells the validation system that there is no problem
        }
        return {validateLocation: false}; //this matches the return type where an object is returned; the key is a string and the return type is any
    }

}