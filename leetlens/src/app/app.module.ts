import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

import { AppRoutingModule } from './app-routing.module';
import { App } from './app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Canvas } from './components/canvas/canvas';
import { Colorpicker } from './components/colorpicker/colorpicker';
import { JsonInput } from './components/json-input/json-input';
import { ExamplesList } from './components/examples-list/examples-list';
import { TogglePanel } from './components/toggle-panel/toggle-panel';
import { TabView } from './components/tab-view/tab-view';
import { ContentView } from './components/content-view/content-view';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    App,
    Canvas,
    Colorpicker,
    JsonInput,
    ExamplesList,
    TogglePanel,
    TabView,
    ContentView,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [App],
})
export class AppModule {}
