import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseAuthService } from './providers/firebase-auth.service';
import { Router } from '@angular/router';
import { WidgetUtilService } from './providers/widget-util.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    }
  ];

  isLoggedIn:boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseAuthService: FirebaseAuthService,
    private router: Router,
    private widgetUtilService: WidgetUtilService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.getAuthState();
  }

  getAuthState(){
    this.widgetUtilService.presentLoading();
    this.firebaseAuthService.getAuthState().subscribe(user => {
      if(user){
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
      this.handleNavigation();
      this.widgetUtilService.dismissLoader();
    },(error) => {
      this.widgetUtilService.dismissLoader();
      this.widgetUtilService.presentErrorToast(error.message);
    });
  }

  handleNavigation(){
    if(this.isLoggedIn){
      const currentUrl = this.router.url.split('/')[1];
      if(currentUrl === 'login' || currentUrl === 'signup'){
        this.router.navigate(['/home']);
      }
    }else{
      this.router.navigate(['/login']);
    }
  }

}
