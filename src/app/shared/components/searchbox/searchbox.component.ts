import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-searchbox',
  templateUrl: './searchbox.component.html',
  styles: ``
})
export class SearchboxComponent {
  @Input()
  public placeholder: string ='';

  @Input()
  public initialValue:string= '';

 @Output()
 onValue: EventEmitter <string> = new EventEmitter(); 

 emitValue(value:string){
  this.onValue.emit(value)
 }

} 

