import { Component, OnInit } from '@angular/core';
import { Ng2DeviceService } from 'ng2-device-detector';

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit {
  deviceInfo = null;


  constructor(private deviceService: Ng2DeviceService) { }

  ngOnInit() {
    this.epicFunction();
  }
  epicFunction() {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    console.log(this.deviceInfo);

  }
  public getIsItMobile(): Boolean {
    return this.deviceService.isMobile();

  }
}
