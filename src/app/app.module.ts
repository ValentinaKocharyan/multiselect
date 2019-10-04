import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DropdownComponent } from './@theme/components/dropdown/dropdown.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpMockRequestInterceptor } from './@core/interceptor';
import {OutsideClickDirective} from './@theme/directives/outside-click.directive';

@NgModule({
  declarations: [
    AppComponent,
    DropdownComponent,
    OutsideClickDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpMockRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
