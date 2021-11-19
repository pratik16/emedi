import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';


@Directive({
  selector: '[appImage]'
})
export class ImageplaceholderDirective {

  @Input() src: any;

    constructor(private imageRef: ElementRef) {
    }

    ngAfterViewInit(): void {
        const img = new Image();
        img.onload = () => {
            this.setImage(this.src);
        };

        img.onerror = () => {
            // Set a placeholder image 
            this.setImage('https://www.emedimarket.com/assets/emedi_market.png');
        };

        img.src = this.src;
    }

    private setImage(src: string) {
        this.imageRef.nativeElement.setAttribute('src', src);
    }
  
}
