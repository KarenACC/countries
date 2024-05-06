import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, catchError, delay, tap} from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({providedIn: 'root'})

export class CountriesService {

    private apiUrl:string = 'https://restcountries.com/v3.1';
    public cacheStore:CacheStore = {
        byCapital: {term: '', countries: []},
        byCountry: {term: '', countries: []},
        byRegion: {term: '', countries: []}
    }



    constructor(private http: HttpClient) { this.getFromLocalStorage() }

    saveToLocalStorage(){
        localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
    }

    getFromLocalStorage(){
        if(!localStorage.getItem('cacheStore')) return;

        this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
    }

    getCountriesRequest(url:string):Observable<Country[]>{
        return this.http.get<Country[]>(url)
        .pipe(
            catchError(error => of([])),
            delay(1500)
             )
    }

    searchCountryByAlphaCode(code:string):Observable<Country | null>{
        return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
        .pipe(
                map(countries => countries.length > 0 ? countries[0] : null),
                catchError(error => of(null))
             )
    }

    searchCapital(term:string):Observable<Country[]>{
       const url = `${this.apiUrl}/capital/${term}`;
      return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = {term: term, countries: countries}),
        tap( ()=> this.saveToLocalStorage())
      )

    }

    searchCountry(term:string):Observable<Country[]>{
        const url = `${this.apiUrl}/name/${term}`;
        return this.getCountriesRequest(url)
        .pipe(
            tap(countries => this.cacheStore.byCountry = {term: term, countries: countries}),
            tap( ()=> this.saveToLocalStorage())
          )
    }
    searchRegion(term:string):Observable<Country[]>{
        const url = `${this.apiUrl}/region/${term}`;
        return this.getCountriesRequest(url)
        .pipe(
            tap(countries => this.cacheStore.byRegion = {term: term, countries: countries}),
            tap( ()=> this.saveToLocalStorage())
          )
    }


    
}