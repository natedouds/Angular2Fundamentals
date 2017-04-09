import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'simple-modal',
    template: `
        <div id="{{elementId}}" class="modal fade" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">{{title}}</h4>
                    </div>
                    <div class="modal.body">
                        <ng-content></ng-content>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .modal-body {
            height: 250px;
            overflow-y: scroll;
        }
    `]
})
export class SimpleModalComponent implements OnInit {
    @Input() title: string;
    //this elementId is a way of ensuring that our modal is a reusable component, in that the id can be set on the front end and passed back to the component, allowing for multiple instances
    //of the component, each with a unique id but shared functionality
    @Input() elementId: string;

    constructor() {
    }

    ngOnInit() {
    }

}