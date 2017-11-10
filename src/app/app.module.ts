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
import { PresaAboutusComponent } from './presa-aboutus/presa-aboutus.component';
import { OnlineConsultationComponent } from './online-consultation/online-consultation.component';
import { UserComponent } from './user/user.component';
import { OfflineConsultationComponent } from './offline-consultation/offline-consultation.component';
import { PressaModuleModule} from './presa-aboutus/pressa-module/pressa-module.module';
import { PressaCurObjectComponent } from './presa-aboutus/pressa-cur-object/pressa-cur-object.component';
import { ApiService} from './shared/api.service';
import { AuthService} from './shared/auth.service';
import { LoginComponent } from './login/login.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import {AuthGuard} from './auth.guard';
import { ContentEditComponent } from './presa-aboutus/content-edit/content-edit.component';
import { FeedbackViewComponent } from './feedback/feedback-view/feedback-view.component';
import { FeedbackEditComponent } from './feedback/feedback-edit/feedback-edit.component';
import { FeedbackListComponent } from './feedback/feedback-list/feedback-list.component';
import {PressaServiceService} from './presa-aboutus/pressa-service.service';
import { TeamClinicListComponent } from './team-clinic/team-clinic-list/team-clinic-list.component';
import { TeamClinicViewComponent } from './team-clinic/team-clinic-view/team-clinic-view.component';
import { TeamClinicEditComponent } from './team-clinic/team-clinic-edit/team-clinic-edit.component';
import {TeamClinicService} from './team-clinic/team-clinic.service';
import {ContentService} from './shared/content.service';
import { SafeHtmlPipe } from './utils/safe-html.pipe';
import { AboutClinicViewComponent } from './about-clinic/about-clinic-view/about-clinic-view.component';
import {AboutClinicService} from './about-clinic/about-clinic.service';
import { PreoperativePreparationListComponent } from './preoperative-preparation/preoperative-preparation-list/preoperative-preparation-list.component';
import { PreoperativePreparationViewComponent } from './preoperative-preparation/preoperative-preparation-view/preoperative-preparation-view.component';
import {PreoperativePreparationService} from './preoperative-preparation/preoperative-preparation.service';
import { MaterialsListComponent } from './materials/materials-list/materials-list.component';
import { MaterialsViewComponent } from './materials/materials-view/materials-view.component';
import {MaterialsService} from './materials/materials.service';

export const mapKindsOfMedia: Map< string, string> = new Map< string, string>(
  [['', ''],
    ['videoFromYouTube', 'Video from YouTube'],
    ['videoFromGoogleDrive', 'Video from Google Drive'],
    ['imageFromGoogleDrive', 'Image from Google Drive'],
    ['fileFromGoogleDrive', 'File from Google Drive'],
    ['folderFromGoogleDrive', 'Folder from Google Drive'],
    ['htmlContent', 'HTML content'],
    ['otherContent', 'Other content']
  ]
);

export const openUrlGet: string[] = ['presa-aboutus', 'online-consultation',
  'materials', 'feedback-clients', 'preoperative-preparation', 'team-clinic', 'about-clinic'];

export const openUrlPost: string[] = ['online-consultation', 'xxx', 'feedback-clients'];

@NgModule({
  declarations: [
    AppComponent,
    MenuTopComponent,
    ContactsOurComponent,
    MainCenterComponent,
    AboutClinicComponent,
    PresaAboutusComponent,
    OnlineConsultationComponent,
    UserComponent,
    OfflineConsultationComponent,
    PressaCurObjectComponent,
    LoginComponent,
    ClientsListComponent,
    ContentEditComponent,
    FeedbackViewComponent,
    FeedbackEditComponent,
    FeedbackListComponent,
    TeamClinicListComponent,
    TeamClinicViewComponent,
    TeamClinicEditComponent,
    SafeHtmlPipe,
    AboutClinicViewComponent,
    PreoperativePreparationListComponent,
    PreoperativePreparationViewComponent,
    MaterialsListComponent,
    MaterialsViewComponent
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
    { provide: 'openUrlGet', useValue: openUrlGet},
    { provide: 'openUrlPost', useValue: openUrlPost},
    { provide: ApiService, useClass: ApiService},
    { provide: AuthService, useClass: AuthService},
    { provide: AuthGuard, useClass: AuthGuard},
    { provide: PressaServiceService, useClass: PressaServiceService},
    { provide: TeamClinicService, useClass: TeamClinicService},
    { provide: ContentService, useClass: ContentService},
    { provide: AboutClinicService, useClass: AboutClinicService},
    { provide: PreoperativePreparationService, useClass: PreoperativePreparationService},
    { provide: MaterialsService, useClass: MaterialsService}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
