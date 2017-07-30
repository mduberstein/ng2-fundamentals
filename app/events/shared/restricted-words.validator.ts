//Custom Validator 1 - standanlone function return a function of proper signature

import { FormControl } from '@angular/forms'
//custom validator is a function taking a FormControl and returning an object or null. It has to return null if the control is valid and the errors object if it is not valid. The errors object is accessible on the template via <bound component property>.errors.
// Version 1
// // {[key: string]: any} is typescript syntax that only means that the function returns an object, regardless of its shape
// //to fail validation return error object containing a key matching the validator name, here - 'restrictedWords', while the value can be any, e.x. here it is 'foo', but this value is useful since it can be displayed in the error message - see create-session.component html
// private restrictedWords(control: FormControl):{[key: string]: any}
// {
//     return control.value.includes('foo')?{'restrictedWords':'foo'}:null
// }
// final version
export function restrictedWords(words: string[]) {
    return (control: FormControl): { [key: string]: any } => {
        //validator passed
        if (!words) {
            return null
        }
        // let invalidWords = words.map(w=>control.value.includes(w) ? w : null).filter(w=>w != null) // original course logic, mine below is better
        let invalidWords = words.filter(w => control.value.includes(w))
        return invalidWords && invalidWords.length > 0 ? { 'restrictedWords': invalidWords.join(', ') } : null
    }
}