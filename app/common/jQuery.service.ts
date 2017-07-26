import {OpaqueToken} from '@angular/core'

export let JQ_TOKEN = new OpaqueToken('jQuery');

//jQuery.d.ts is not used because the method that bootstrap adds to jQuery and which we need is not in that file