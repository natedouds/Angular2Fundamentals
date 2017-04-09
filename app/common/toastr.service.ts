//create a token used for DI registry to find an instance of the object that we want
import { OpaqueToken } from '@angular/core';

//use TOASTR_TOKEN for DI lookup
export let TOASTR_TOKEN = new OpaqueToken('toastr');

export interface Toastr {
    success (msg: string, title?: string): void;
    info (msg: string, title?: string): void;
    warning (msg: string, title?: string): void;
    error (msg: string, title?: string): void;
}