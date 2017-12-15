import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuTopComponent } from './menu-top/menu-top.component';
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
import { AuthGuard} from './auth.guard';
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
import { ContactsOurListComponent } from './contacts-our/contacts-our-list/contacts-our-list.component';
import { ContactsOurViewComponent } from './contacts-our/contacts-our-view/contacts-our-view.component';
import {ContactsOurService} from './contacts-our/contacts-our.service';
import { QuestionsListComponent } from './online-consultation/questions-list/questions-list.component';
import { QuestionsViewComponent } from './online-consultation/questions-view/questions-view.component';
import { AnswerViewComponent } from './online-consultation/answer-view/answer-view.component';
import {OnlineConsultationService} from './online-consultation/online-consultation.service';
import { QuestionsEditComponent } from './online-consultation/questions-edit/questions-edit.component';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { OfflineConsultationListComponent } from './offline-consultation/offline-consultation-list/offline-consultation-list.component';
import { OfflineConsultationTimeViewComponent } from './offline-consultation/offline-consultation-time-view/offline-consultation-time-view.component';
import { OfflineConsultationService } from './offline-consultation/offline-consultation.service';

registerLocaleData(localeRu);

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
  'materials', 'feedback-clients', 'preoperative-preparation', 'team-clinic',
  'about-clinic', 'contacts-our', 'schedule', 'offline-consultation'];

export const openUrlPost: string[] = ['feedback-clients', 'xxx', 'feedback-clients'];

@NgModule({
  declarations: [
    AppComponent,
    MenuTopComponent,
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
    MaterialsViewComponent,
    ContactsOurListComponent,
    ContactsOurViewComponent,
    QuestionsListComponent,
    QuestionsViewComponent,
    AnswerViewComponent,
    QuestionsEditComponent,
    OfflineConsultationListComponent,
    OfflineConsultationTimeViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    // HttpModule,
    HttpClientModule,
    AppRoutingModule,
    PressaModuleModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    Ng2DeviceDetectorModule.forRoot()
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
    { provide: MaterialsService, useClass: MaterialsService},
    { provide: ContactsOurService, useClass: ContactsOurService},
    { provide: OnlineConsultationService, useClass: OnlineConsultationService},
    { provide: OfflineConsultationService, useClass: OfflineConsultationService}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
