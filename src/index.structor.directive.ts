import { Directive, TemplateRef, ViewContainerRef, Input, Inject} from '@angular/core';


@Directive({
    selector: '[structorDirective]'
})
export class StructorDirective{
    templateRef: TemplateRef<any>;
    viewContainer: ViewContainerRef;
    
    constructor(template: TemplateRef<any>, view: ViewContainerRef){
        this.templateRef = template;
        this.viewContainer = view;
    }

    @Input() set structorDirective(condition: boolean) {
        if (!condition) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}

