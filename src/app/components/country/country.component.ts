import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VariablesService } from '../../services/variables.service';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})

export class CountryComponent implements OnInit {

    country: any = {};
    borders: Array<any> = [];

    constructor(
        private countryAPI: CountriesService,
        private route: ActivatedRoute,
        public global: VariablesService
    ) { }

    ngOnInit(): void {
        let code = String(this.route.snapshot.paramMap.get('code'));
        this.countryAPI.getCountryByCode(code)
            .subscribe((country) => {
                this.country = country;
                this.country.currencies = country.currencies.map((o: any) => o['name']).join(', ');
                this.country.languages = country.languages.map((o: any) => o['name']).join(', ');

                for(let i = 0, j = this.country.borders.length; i < j; i++) {
                    console.log(this.country.borders[i]);
                    this.countryAPI.getNameByCode(this.country.borders[i])
                        .subscribe(border => this.borders.push(border));
                }
            });
    }

}
