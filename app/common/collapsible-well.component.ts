import {Component} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'collapsible-well',
    template: `
        <div (click)="toggleContent()" class="well pointable">
            <h4>
                <ng-content select="[well-title]"></ng-content>
            </h4>
            <!--whatever content exists inside the component, is what goes here-->
            <ng-content select="[well-body]" *ngIf="visible"></ng-content>
        </div>
    `
})
export class CollapsibleWellComponent {
    visible: boolean = true;

    toggleContent() {
        this.visible = !this.visible;
    }

}