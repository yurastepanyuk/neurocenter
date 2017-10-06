import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuTopComponent } from './menu-top/menu-top.component';
import { ContactsOurComponent } from './contacts-our/contacts-our.component';
import { MainCenterComponent } from './main-center/main-center.component';
import { AboutClinicComponent } from './about-clinic/about-clinic.component';
import { TeamClinicComponent } from './team-clinic/team-clinic.component';
import { FeedbackClientsComponent } from './feedback-clients/feedback-clients.component';
import { PresaAboutusComponent } from './presa-aboutus/presa-aboutus.component';
import { OnlineConsultationComponent } from './online-consultation/online-consultation.component';
import { PreoperativePreparationComponent } from './preoperative-preparation/preoperative-preparation.component';
import { MaterialsComponent } from './materials/materials.component';
import { UserComponent } from './user/user.component';
import { OfflineConsultationComponent } from './offline-consultation/offline-consultation.component';
import { PressaModuleModule} from './presa-aboutus/pressa-module/pressa-module.module';
import { PressaCurObjectComponent } from './presa-aboutus/pressa-cur-object/pressa-cur-object.component';
import { ApiService} from './shared/api.service';
import { AuthService} from './shared/auth.service';
import { LoginComponent } from './login/login.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import {AuthGuard} from './auth.guard';

export const mapKindsOfMedia: Map< string, string> = new Map< string, string>(
  [['', ''],
    ['videoFromYouTube', 'Video from YouTube'],
    ['videoFromGoogleDrive', 'Video from Google Drive'],
    ['imageFromGoogleDrive', 'Image from Google Drive'],
    ['fileFromGoogleDrive', 'File from Google Drive'],
    ['folderFromGoogleDrive', 'Folder from Google Drive'],
    ['otherContent', 'Other content']
  ]
);

export const openUrl: string[] = ['presa-aboutus', 'online-consultation', 'materials', 'feedback-clients', 'preoperative-preparation'];

@NgModule({
  declarations: [
    AppComponent,
    MenuTopComponent,
    ContactsOurComponent,
    MainCenterComponent,
    AboutClinicComponent,
    TeamClinicComponent,
    FeedbackClientsComponent,
    PresaAboutusComponent,
    OnlineConsultationComponent,
    PreoperativePreparationComponent,
    MaterialsComponent,
    UserComponent,
    OfflineConsultationComponent,
    PressaCurObjectComponent,
    LoginComponent,
    ClientsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    PressaModuleModule
  ],
  providers: [
    { provide: 'mapKindsOfMedia', useValue: mapKindsOfMedia },
    { provide: 'openUrl', useValue: openUrl},
    { provide: ApiService, useClass: ApiService},
    { provide: AuthService, useClass: AuthService},
    { provide: AuthGuard, useClass: AuthGuard}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
