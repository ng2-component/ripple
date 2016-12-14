import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { NgComponentDemo } from './index.component';

import { RippleModule } from '../index.module';

@NgModule({
    imports: [ RippleModule, BrowserModule ],
    declarations: [ NgComponentDemo ],
    bootstrap: [ NgComponentDemo ]
})
export class NgComponentDemoModule{}