'use strict';
import { environment } from '../../environments/environment';
export const api_url: string=environment.api_url;

export function url (path:string) {
    return api_url + path;
}