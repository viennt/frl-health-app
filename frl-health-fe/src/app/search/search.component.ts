import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { faPlus, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { askForServer, SERVER_URL } from '../../constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  // @ts-ignore
  @ViewChild('notify') private notify: SwalComponent;

  faPlus = faPlus;
  faCircleNotch = faCircleNotch;

  menus: any[];
  searchTimeout: any;

  constructor(private http: HttpClient) {
    //
  }

  ngOnInit() {
    this.searchMenus();
  }

  onSearchMenus(event) {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.searchMenus(event.value);
    }, 500);
  }

  onClickAddMenu(menuId: number) {
    const userId = localStorage.getItem('userId');
    this.http.post(
      `${SERVER_URL}/users/${userId}/menus/${menuId}`,
      {headers: {'Content-Type': 'application/json'}}
    ).toPromise()
      .then((response: any) => {
        if (response.code === 1) {
          this.notify.title = 'Add success!';
          this.notify.type = 'success';
          this.notify.show();
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

  searchMenus(query?: string) {
    this.http.get(
      `${SERVER_URL}/menus` + (!!query ? `/?q=${query}` : ''),
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
