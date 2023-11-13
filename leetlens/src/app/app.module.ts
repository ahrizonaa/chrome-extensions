import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CanvasComponent } from './components/canvas/canvas.component';
import { ColorpickerComponent } from './components/colorpicker/colorpicker.component';
import { JsonInputComponent } from './components/json-input/json-input.component';
import { ExamplesListComponent } from './components/examples-list/examples-list.component';
import { VariantsPanelComponent } from './components/variants-panel/variants-panel.component';
import { DatastructureRadioGroupComponent } from './components/datastructure-radio-group/datastructure-radio-group.component';
import { DatastructureRadioButtonComponent } from './components/datastructure-radio-button/datastructure-radio-button.component';
import { DatastructureRadioDropdownComponent } from './components/datastructure-radio-dropdown/datastructure-radio-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ColorpickerComponent,
    JsonInputComponent,
    ExamplesListComponent,
    VariantsPanelComponent,
    DatastructureRadioGroupComponent,
    DatastructureRadioButtonComponent,
    DatastructureRadioDropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
