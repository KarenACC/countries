import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  apiUril: string = 'https://restcountries.com/v3.1'

  public cacheStore:CacheStore={
   byCapital: {term: '', countries:[]},
   byCountries: {term: '', countries:[]},
   byRegion: {region: '', countries:[]} 
  }

  constructor(private http: HttpClient){ this.loadFromLocalStorage();}

  private saveToLcalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }

  private loadFromLocalStorage(){
    if(! localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);

  }

  searchByAlphaCode(code:string): Observable<Country | null>{
    const url:string = (`${this.apiUril}/alpha/${code}`);

     return this.http.get<Country[]>(url)
     .pipe (
      map(countries => countries.length > 0 ? countries[0] : null),
      catchError( () => of (null)),
     )

  }
  
  searchCapital(term:string): Observable<Country[]>{
     const url:string = (`${this.apiUril}/capital/${term}`);

     return this.http.get<Country[]>(url)
     .pipe (
     tap( countries => this.cacheStore.byCapital = {term, countries}),
     tap( ()=> this.saveToLcalStorage() ),
     )
  }

  searchCountry(term: string): Observable<Country[]>{
    const url:string = (`${this.apiUril}/name/${term}`);

     return this.http.get<Country[]>(url)
     .pipe (
      tap( countries => this.cacheStore.byCountries = {term, countries}),
      tap( ()=> this.saveToLcalStorage() ),
     )

  }

  searchRegion(region:Region): Observable<Country[]>{
    const url:string = (`${this.apiUril}/region/${region}`);

     return this.http.get<Country[]>(url)
     .pipe (
      tap( countries => this.cacheStore.byRegion = {region:region, countries}),
      tap( ()=> this.saveToLcalStorage() ),
     
     )

  }

}
