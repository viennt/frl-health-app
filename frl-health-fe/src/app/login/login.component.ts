import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SERVER_URL } from '../../constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  @ViewChild('notify') private notify: SwalComponent;

  username: string;
  password: string;

  constructor(private router: Router, private http: HttpClient) {
    //
  }

  ngOnInit() {
    //
  }

  onSubmitLogin() {
    // Validation
    if (
      !this.username || !this.username.trim() ||
      !this.password || !this.password.trim()
    ) {
      this.notify.title = 'Please enter username and password';
      this.notify.show();
      return;
    }

    // Call api login
    this.http.post(
      SERVER_URL + '/auth/login',
      {username: this.username, password: this.password},
      {headers: {'Content-Type': 'application/json'}}
    ).toPromise()
      .then((response: any) => {
        if (response.code === 1) { // Login success
          localStorage.setItem('userId', response.data.id);
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('role', response.data.username === 'admin' ? 'admin' : 'user');
          if (response.data.username === 'admin') {
            this.router.navigate(['/medical-conditions']);
          } else {
            this.router.navigate(['/collection']);
          }
        } else {
          this.notify.title = 'Wrong credentials';
          this.notify.show();
        }
      })
      .catch(error => {
        this.notify.title = error;
        this.notify.show();
      });
  }

}
