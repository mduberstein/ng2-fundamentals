    import {FormControl} from '@angular/forms'
    //validator function
    // private restrictedWords(control: FormControl):{[key: string]: any}
    // {   //return error object contains a key matching the validator name
    //     return control.value.includes('foo')?{'restrictedWords':'foo'}:null
    // }
   export function restrictedWords(words: string []){
        return (control: FormControl):{[key:string]:any}=>{
            //validator passed
            if(!words){
                return null
            }
            let invalidWords = words.map(w=>control.value.includes(w) ? w : null).filter(w=>w != null)
            return invalidWords && invalidWords.length > 0 ?{'restrictedWords': invalidWords.join(', ')}: null
        }
    }