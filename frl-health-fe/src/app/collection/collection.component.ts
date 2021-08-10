import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { faTimes, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { askForServer, SERVER_URL } from '../../constants';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
})
export class CollectionComponent implements OnInit {
  // @ts-ignore
  @ViewChild('notify') private notify: SwalComponent;

  faTimes = faTimes;
  faCircleNotch = faCircleNotch;

  menus: any[];

  constructor(private http: HttpClient) {
    //
  }

  ngOnInit() {
    this.getList();
  }

  onClickRemoveMenu(menuId: number) {
    const userId = localStorage.getItem('userId');
    this.http.delete(
      `${SERVER_URL}/users/${userId}/menus/${menuId}`,
      {headers: {'Content-Type': 'application/json'}}
    ).toPromise()
      .then((response: any) => {
        if (response.code === 1) {
          this.notify.title = 'Remove success!';
          this.notify.type = 'success';
          this.notify.show();
          this.getList();
        } else {
          this.notify.title = response.message;
          this.notify.show();
        }
      })
      .catch(error => {
        this.notify.title = error;
        this.notify.show();
      });
  }

  getList() {
    const userId = localStorage.getItem('userId');
    this.http.get(
      `${SERVER_URL}/users/${userId}/menus`,
      {headers: {'Content-Type': 'application/json'}}
    ).toPromise()
      .then((response: any) => {
        if (response.code === 1) {
          this.menus = response.data;
        } else {
          this.notify.title = response.message;
          this.notify.show();
        }
      })
      .catch(error => {
        if (error && error.statusText === 'Unknown Error') {
          askForServer(SERVER_URL);
        }
        this.notify.title = error;
        this.notify.show();
      });
  }
}
