import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { MedicalConditionModule } from './medical-condition/medical-condition.module';
import { MenuModule } from './menu/menu.module';
import { SearchModule } from './search/search.module';
import { CollectionModule } from './collection/collection.module';
import { SingleMenuModule } from './single-menu/single-menu.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/medical-conditions', pathMatch: 'full'},
    ]),
    LoginModule,
    RegisterModule,
    MedicalConditionModule,
    MenuModule,
    SearchModule,
    CollectionModule,
    SingleMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
