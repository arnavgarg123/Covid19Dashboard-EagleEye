import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { CasesNumberComponent } from './cases-number/cases-number.component';
import { RegulationsComponent } from './regulations/regulations.component';
import { SiteLinksComponent } from './site-links/site-links.component';
import { MapsComponent } from './maps/maps.component';
import { MenuComponent } from './menu/menu.component';
import { ChatService } from './services/chat.service';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { CasesComponent } from './cases/cases.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardadminComponent } from './dashboardadmin/dashboardadmin.component';
import { MapadminComponent } from './mapadmin/mapadmin.component';
import { ActionDetectComponent } from './action-detect/action-detect.component';
import { ProximityComponent } from './proximity/proximity.component';
import { TooltipModule } from 'ng2-tooltip-directive';
@NgModule({
  declarations: [
    AppComponent,
    GeneralInfoComponent,
    DashboardComponent,
    HeaderComponent,
    CasesNumberComponent,
    RegulationsComponent,
    SiteLinksComponent,
    MapsComponent,
    MenuComponent,
    ChatWindowComponent,
    LoginComponent,
    CasesComponent,
    SignupComponent,
    DashboardadminComponent,
    MapadminComponent,
    ActionDetectComponent,
    ProximityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TooltipModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBL7PlI3tjq4mbYWrICjswIuFEf-bZgmpI'
    })
  ],
  providers: [ChatService, AuthGuard, SiteLinksComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
