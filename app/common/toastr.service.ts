
import {OpaqueToken} from '@angular/core'

export let TOASTR_TOKEN = new OpaqueToken('toastr');

// interface cannot be used for dependency lookup, is only used for intelliscence
export interface Toastr {
    success (msg: string, title?: string): void;
    info (msg: string, title?: string): void;
    warning (msg: string, title?: string): void;
    error (msg: string, title?: string): void;
}

// before opaque token dependency injection

// import {Injectable} from '@angular/core'
// declare let   toastr:any
// // toastr is a global variable hanging of window
// @Injectable()
// export class ToastrService{
//     success(message:string, title?:string){
//         toastr.success(message, title);
//     }
//     info(message:string, title?:string){
//         toastr.info(message, title);
//     }
//     warning(message:string, title?:string){
//         toastr.warning(message, title);
//     }
//     error(message:string, title?:string){
//         toastr.error(message, title);
//     }
// }