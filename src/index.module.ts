import { NgModule } from '@angular/core';

import { ComponentDemo } from './index.component';
import { PropertyDirective } from './index.property.directive';
import { StructorDirective } from './index.structor.directive';


@NgModule({
    declarations: [ ComponentDemo, PropertyDirective, StructorDirective ],
    exports: [ ComponentDemo, PropertyDirective, StructorDirective ]
})
export class ThirdPartModule{}