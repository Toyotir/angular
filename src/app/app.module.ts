import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { formatDate, DatePipe } from '@angular/common';

// import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocietyService } from './society.service';
import { DriverService } from './driver.service';
import { CarService } from './car.service';
import { AdminService } from './admin.service';
import { AuthGuard } from './auth.guard';
import { SocietyListComponent } from './societylist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MAT_DATE_LOCALE,
  MatSelectModule,
  MatOptionModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatToolbarModule,
  MatSnackBarModule
} from '@angular/material';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { DriverlistComponent } from './driverlist/driverlist.component';
import { DriverDialogComponent } from './driver-dialog/driver-dialog.component';
import { SocaddDialogComponent } from './socadd-dialog/socadd-dialog.component';
import { SoceditDialogComponent } from './socedit-dialog/socedit-dialog.component';
import { DeldriverDialogComponent } from './deldriver-dialog/deldriver-dialog.component';
import { EditdriverDialogComponent } from './editdriver-dialog/editdriver-dialog.component';
import { CarlistComponent } from './carlist/carlist.component';
import { AddcarDialogComponent } from './addcar-dialog/addcar-dialog.component';
import { DelcarDialogComponent } from './delcar-dialog/delcar-dialog.component';
import { EditcarDialogComponent } from './editcar-dialog/editcar-dialog.component';
import { RoadDialogComponent } from './road-dialog/road-dialog.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AgmCoreModule, GoogleMapsAPIWrapper, MarkerManager, InfoWindowManager } from '@agm/core';
import { MapsheetComponent } from './mapsheet/mapsheet.component';
import { DelsocDialogComponent } from './delsoc-dialog/delsoc-dialog.component';
import { InvalidComponent } from './invalid/invalid.component';

@NgModule({
  declarations: [
    AppComponent,
    SocietyListComponent,
    DriverlistComponent,
    DriverDialogComponent,
    SocaddDialogComponent,
    SoceditDialogComponent,
    DeldriverDialogComponent,
    EditdriverDialogComponent,
    CarlistComponent,
    AddcarDialogComponent,
    DelcarDialogComponent,
    EditcarDialogComponent,
    RoadDialogComponent,
    // BottomMap,
    LoginComponent,
    LogoutComponent,
    MapsheetComponent,
    DelsocDialogComponent,
    InvalidComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatBottomSheetModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatSnackBarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB3o5jaBpAwa8r6c3cFx6ZcD8uaKMs3s8k'
    })
  ],
  providers: [DatePipe, GoogleMapsAPIWrapper, InfoWindowManager, MarkerManager, AdminService,
    AuthGuard, SocietyService, CarService, DriverService, { provide: MAT_DATE_LOCALE, useValue: 'fr-BE' }],
  bootstrap: [AppComponent],
  entryComponents: [DriverDialogComponent, SocaddDialogComponent,
    SoceditDialogComponent, EditdriverDialogComponent, DeldriverDialogComponent,
    AddcarDialogComponent, EditcarDialogComponent, DelcarDialogComponent, RoadDialogComponent,
    MapsheetComponent, DelsocDialogComponent
  ]
})
export class AppModule { }
