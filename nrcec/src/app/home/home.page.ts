import { Component } from '@angular/core';
import { FirebaseAuthService } from '../providers/firebase-auth.service';
import { WidgetUtilService } from '../providers/widget-util.service';
import { Router } from '@angular/router';
import { FirestoreDbService } from '../providers/firestore-db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private firebaseAuthService: FirebaseAuthService, 
    private widgetUtilService: WidgetUtilService,
    private router: Router,
    private firestoreDbDervice: FirestoreDbService) {
      /*this.getProductList();*/
    }

logout(){
  try{
    const result = this.firebaseAuthService.logout();
    result.then(reason => {
      console.log('logout reponse: '+reason);
    });
    this.widgetUtilService.presentToast('Logout Success!');
    this.router.navigate(['/login']);
  }catch(error){
    this.widgetUtilService.presentErrorToast(error.message);
    throw new Error(error);
  }
}

readAbout(){
  this.router.navigate(['/about']);
}

goToProfile(){
  this.router.navigate(['/profile']);
}

getProductList(){
  this.firestoreDbDervice.getProductList().subscribe(result => {
    console.log('result: '+result);
  })
}

}
