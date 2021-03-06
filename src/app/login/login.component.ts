import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../shared/api.service';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public myForm: FormGroup;
  errorMessage: string;

  constructor(fb: FormBuilder,
              private api: ApiService,
              private auth: AuthService,
              private router: Router) {
    this.myForm = fb.group({
      'username':  ['', Validators.required],
      'password':  ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(form: any): void {

    if (!this.myForm.valid) {
      return;
    }
    const payload = {
      username: this.myForm.get('username').value,
      password: this.myForm.get('password').value
    };
    this.api.postHttpClient('authenticate', payload).subscribe( data => {
        console.log('data authenticate: ');
        console.log(data);
        let token = '';
        Object.getOwnPropertyNames(data).forEach(
          function (val, idx, array) {
            // console.log(val + ' -> ' + data[val]);
            if (val.trim() === 'token') {
              token = data[val];
            }
          }
        );
        this.auth.setToken(token);
        this.router.navigate(['/mainpage']);
      },
      error => this.errorMessage = <any>error);
  }
}
