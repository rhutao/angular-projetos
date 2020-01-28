import { AboutAppComponent } from './about-app/about-app.component';
import { FeedAppComponent } from './feed-app/feed-app.component';
import { MaestriaAppComponent } from './maestria-app/maestria-app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'home', component: FeedAppComponent },
  { path: 'maestria-app', component: MaestriaAppComponent },
  { path: 'about-app', component: AboutAppComponent },
  { path: '',
  redirectTo: '/home',
  pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
