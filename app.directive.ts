import { Directive, ElementRef, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";



@Directive({
  selector: '[appNumberFormat]'
})
export class NumberFormatDirective{


  constructor(private el: ElementRef, private control : NgControl) {
  }

  @HostListener('input',['$event']) onEvent($event){
    if(!isNaN($event.data) && $event.data) {
        let formattedValue = this.getNumberFormat(this.el.nativeElement.value);
        this.control.control.setValue(this.setNumberFormat(formattedValue));
    } else if ($event.data === null && !this.getNumberFormat(this.el.nativeElement.value)) {
        this.control.control.setValue('');
    }
  }

  getNumberFormat( value: string ): any {
    let valueNoDecimal : string = value.replace(/(\.[0-9]*?)[0-9]+/g, "");
    return valueNoDecimal.replace(/[^0-9\.]+/g, "");
  }

  setNumberFormat( value: string ) {
    return '$'+ value + '.00';
  }

}