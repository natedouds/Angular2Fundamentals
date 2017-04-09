//create a token used for DI registry to find an instance of the object that we want
import { OpaqueToken } from '@angular/core';

//use JQ_TOKEN for DI lookup
export let JQ_TOKEN = new OpaqueToken('jQuery');