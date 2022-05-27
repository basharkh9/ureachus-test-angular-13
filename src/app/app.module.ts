import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { InspectionListComponent } from './inspection-list/inspection-list.component';
import { InspectionService } from './services/inspection.service';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import DropdownComponent from './shared/dropdown-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InspectionFormComponent } from './inspection-form/inspection-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    InspectionListComponent,
    DropdownComponent,
    InspectionFormComponent,
  ],
  imports: [
    BrowserModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    RouterModule.forRoot(
      [
        { path: '', redirectTo: '/inspections', pathMatch: 'full' },
        { path: 'inspections/new', component: InspectionFormComponent },
        { path: 'inspections/edit/:id', component: InspectionFormComponent },
        { path: 'inspections', component: InspectionListComponent },
      ],
      { relativeLinkResolution: 'legacy' }
    ),
  ],
  providers: [InspectionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
