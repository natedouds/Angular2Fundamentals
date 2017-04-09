import {Directive, OnInit, Inject, ElementRef} from '@angular/core';
import {JQ_TOKEN} from "./jQuery.service";

@Directive({
    //use the css selector to indicate that this is an attribute, not an element
    selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit {

    private el: HTMLElement;

    //when this directive is constructed, I want a reference to the element that it is on
    constructor(@Inject(JQ_TOKEN) private $: any, ref: ElementRef) {
        this.el = ref.nativeElement;
    }

    ngOnInit() {
        this.el.addEventListener('click', e => {
            this.$('#simple-modal').modal({});
        });
    }

}