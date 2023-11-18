import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { App } from './app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Canvas } from './components/canvas/canvas';
import { Colorpicker } from './components/colorpicker/colorpicker';
import { JsonInput } from './components/json-input/json-input';
import { ExamplesList } from './components/examples-list/examples-list';
import { VariantsPanel } from './components/variants-panel/variants-panel';
import { TabView } from './components/tab-view/tab-view';
import { ContentView } from './components/content-view/content-view';

@NgModule({
  declarations: [
    App,
    Canvas,
    Colorpicker,
    JsonInput,
    ExamplesList,
    VariantsPanel,
    TabView,
    ContentView,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [App],
})
export class AppModule {}
