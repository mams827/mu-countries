import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { VariablesService } from '../../services/variables.service';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})

export class CountriesComponent implements OnInit {

    countries: Array<any> = [];
    optionsAreVisible: boolean = false;
    regionIsSelected: boolean = false;

    regionFilter: Array<string> = [
        'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'
    ]

    private inputMessage: Subject<string> = new Subject<string>();

    @ViewChild('searchInput') searchInput!: ElementRef;
    @ViewChild('selectButton') selectButton!: ElementRef;
    @ViewChild('options') options!: ElementRef;
    @ViewChild('textSelect') textSelect!: ElementRef;

    constructor(
        private renderer: Renderer2,
        private countryAPI: CountriesService,
        public global: VariablesService
    ) {
        this.renderer.listen('window', 'click',(e:Event)=>{
            if(e.target !== this.selectButton.nativeElement
                && e.target!==this.options.nativeElement
                && e.target!==this.textSelect.nativeElement){
                this.optionsAreVisible = false;
            }
        });

        this.inputMessage.pipe(debounceTime(400))
            .subscribe((term) => {
                this.countryAPI.getCountries(term)
                    .subscribe(countries => this.countries = countries);
            });
    }

    ngOnInit(): void {
        this.countryAPI.getCountries()
            .subscribe(countries => this.countries = countries);
    }

    toggleOptions(): void {
        this.optionsAreVisible = !this.optionsAreVisible;
    }

    filterByRegion(region: string): void {
        this.searchInput.nativeElement.value = '';
        if(region != '') {
            this.textSelect.nativeElement.innerHTML = region;
            this.regionIsSelected = true;
            this.countryAPI.getCountriesByRegion(region.toLowerCase())
                .subscribe(countries => this.countries = countries);
        } else {
            this.textSelect.nativeElement.innerHTML = 'Filter by region';
            this.regionIsSelected = false;
            this.countryAPI.getCountries('')
                .subscribe(countries => this.countries = countries);
        }
    }

    search(term: string): void {
        this.inputMessage.next(term);
        if(this.regionIsSelected) {
            this.textSelect.nativeElement.innerHTML = 'Filter by region';
            this.regionIsSelected = false;
        }
    }

}
