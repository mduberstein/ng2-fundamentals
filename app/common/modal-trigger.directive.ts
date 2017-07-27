import { Directive, Inject, OnInit, ElementRef, Input } from '@angular/core'
import { JQ_TOKEN } from './jQuery.service'

@Directive({
    // selector is CSS attribute, unlike for components where the selector points to an HTML element
    selector: '[modal-trigger]'

})

export class ModalTriggerDirective {
    private el: HTMLElement
    //alias the input field
    @Input('modal-trigger') modalId:string
    //ElementRef allows access to the HTML element for which this directive is an attribute, via ref injected variable
    constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $: any) {
        this.el = ref.nativeElement;
    }
    ngOnInit() {
        this.el.addEventListener('click', e => {
            this.$(`#${this.modalId}`).modal({})
        })

    }
}