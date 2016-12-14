// js deps
import 'core-js/client/shim.min.js';
import 'zone.js/dist/zone.js';
import 'reflect-metadata/Reflect.js';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgComponentDemoModule } from './index.module';
import { HttpModule }    from '@angular/http';


const platform = platformBrowserDynamic();

platform.bootstrapModule(NgComponentDemoModule);