import {FormControl} from "@angular/forms";


//custom validator, returns null if valid or error object if not valid
//restricted words is a function that returns a function, and that returned function is our validator
export function restrictedWords(words) {
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