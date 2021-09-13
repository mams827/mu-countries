import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class VariablesService {

    isDark: boolean = false;

    constructor() { }
}
