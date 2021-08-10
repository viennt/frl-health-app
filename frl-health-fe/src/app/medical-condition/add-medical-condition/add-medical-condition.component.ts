import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { faArrowLeft, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { askForServer, SERVER_URL } from '../../../constants';

@Component({
  selector: 'app-add-medical-condition',
  templateUrl: './add-medical-condition.component.html',
})
export class AddMedicalConditionComponent implements OnInit {
  // @ts-ignore
  @ViewChild('notify') private notify: SwalComponent;

  faArrowLeft = faArrowLeft;
  faCheck = faCheck;
  faTimes = faTimes;

  name: string;
  description: string;

  menus: any[];
  assignedMenus: any[] = [];
  searchTimeout: any;

  constructor(private router: Router, private http: HttpClient) {
    //
  }

  ngOnInit() {
    //
  }

  onSearchMenus(event) {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      if (event.value) {
        this.searchMenus(event.value);
      } else {
        this.menus = undefined;
      }
    }, 500);
  }

  addMenu(menu: any) {
    if (this.assignedMenus.indexOf(menu) === -1) {
      this.assignedMenus.push(menu);
    }
  }

  removeMenu(menu: any) {
    this.assignedMenus = this.assignedMenus.filter(
      assignedMenu => assignedMenu.id !== menu.id
    );
  }

  onClickSaveMedicalCondition() {
    if (!this.name || !this.name.trim()) {
      this.notify.title = 'Name is required';
      this.notify.show();
      return;
    }

    this.http.post(
      SERVER_URL + '/conditions',
      {
        name: this.name,
        description: this.description,
        menus: this.assignedMenus || []
      },
      {headers: {'Content-Type': 'application/json'}}
    ).toPromise()
      .then((response: any) => {
        if (response.code === 1) {
          this.notify.title = 'Save success!';
          this.notify.type = 'success';
          this.notify.show();
          this.router.navigate(['/medical-conditions']);
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

  searchMenus(query: string) {
    this.http.get(
      `${SERVER_URL}/menus/?q=${query}`,
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
