import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderAppComponent } from './header-app/header-app.component';
import { FeedAppComponent } from './feed-app/feed-app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MaestriaAppComponent } from './maestria-app/maestria-app.component';
import { AboutAppComponent } from './about-app/about-app.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderAppComponent,
    FeedAppComponent,
    MaestriaAppComponent,
    AboutAppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
