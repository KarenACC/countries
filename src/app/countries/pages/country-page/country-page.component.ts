import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent  implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private countriesService:CountriesService
  ) {}

  public country?:Country;
  public currencies!:string[];
  public languages!:string[];

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe( (params)=> {
      this.countriesService.searchCountryByAlphaCode(params['id'])
      .subscribe(country => {
        if(!country){
          return this.router.navigateByUrl('');
        } 
        this.country = country;

        this.currencies = Object.values(this.country.currencies).map((clp) => clp.name);
  
        this.languages = Object.values(this.country.languages)
        return;
      });
    });
  }

}
