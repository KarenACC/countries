import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{
  public placeholder:string = 'Busca por región...';
  public countries:Country[]=[];
  public regions:string[]=['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion!:string;
  public isLoading:boolean=false;

  constructor(private countriesService:CountriesService){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.term
  }

  searchRegion(value:string):void{    
    this.selectedRegion=value;
    this.isLoading=true;
    
    this.countriesService.searchRegion(value)
    .subscribe( countries => {
      this.countries = countries
      this.isLoading=false;
    })  
  }

}
