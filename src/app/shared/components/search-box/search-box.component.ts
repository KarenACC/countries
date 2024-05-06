import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {

  @Input()
  public placeholder:string= '';

  @Output()
  emitValue = new EventEmitter<string>();

  @Input()
  public initialValue:string='';

  search(value:string){
    this.emitValue.emit(value);
    console.log('emitiste', value);
  }

}
