import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CountriesService {

    url = {
        countryList: 'https://restcountries.eu/rest/v2/all?fields=alpha2Code;name;population;region;capital;flag',
        searchCountry: 'https://restcountries.eu/rest/v2/name/{term}?fields=alpha2Code;name;population;region;capital;flag',
        byRegion: 'https://restcountries.eu/rest/v2/region/{region}?fields=alpha2Code;name;population;region;capital;flag',
        countryCode: 'https://restcountries.eu/rest/v2/alpha/{code}',
        countryCodeName: 'https://restcountries.eu/rest/v2/alpha/{code}?fields=alpha2Code;name'
    }

    constructor( private http: HttpClient ) { }

    getCountries(term?: string): Observable<any[]> {
        if(term) {
            return this.http.get<any[]>(this.url.searchCountry.replace(/\{term\}/, term));
        } else {
            return this.http.get<any[]>(this.url.countryList);
        }
    }

    getCountriesByRegion(region: string): Observable<any[]> {
        return this.http.get<any[]>(this.url.byRegion.replace(/\{region\}/, region));
    }

    getCountryByCode(code: string): Observable<any> {
        return this.http.get<any[]>(this.url.countryCode.replace(/\{code\}/, code));
    }

    getNameByCode(code: string): Observable<any> {
        return this.http.get<any[]>(this.url.countryCodeName.replace(/\{code\}/, code));
    }

}
