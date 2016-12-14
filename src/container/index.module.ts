import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { BrowserModule } from '@angular/platform-browser';
import { NgComponentDemo } from './index.component';

import { ThirdPartModule } from '../index.module';

@NgModule({
    imports: [ MaterialModule.forRoot(), ThirdPartModule, BrowserModule ],
    declarations: [ NgComponentDemo ],
    bootstrap: [ NgComponentDemo ]
})
export class NgComponentDemoModule{}