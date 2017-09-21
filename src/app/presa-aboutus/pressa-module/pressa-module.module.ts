import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PressaServiceService } from '../pressa-service.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ ],
  providers: [{provide: PressaServiceService , useClass: PressaServiceService}]
})
export class PressaModuleModule { }
