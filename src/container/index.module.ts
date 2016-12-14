import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgComponentDemo } from './index.component';

import { ThirdPartModule } from '../index.module';

@NgModule({
    imports: [ ThirdPartModule, BrowserModule ],
    declarations: [ NgComponentDemo ],
    bootstrap: [ NgComponentDemo ]
})
export class NgComponentDemoModule{}