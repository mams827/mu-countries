import { Component, OnInit } from '@angular/core';

import { VariablesService } from '../../services/variables.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    constructor(public global: VariablesService) { }

    ngOnInit(): void {
    }

    changeMode(): void {
        this.global.isDark = !this.global.isDark
        if(this.global.isDark) {
            document.body.classList.add('is-dark');
        } else {
            document.body.classList.remove('is-dark');
        }
    }

}
