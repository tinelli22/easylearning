import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  pathProf = 'professores';
  
  constructor(
    private afh: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
      this.afh.authState.subscribe(user => {
        if(user != null) {
          console.log(user);
        }
      });
   }

   login() {
     const provider = new firebase.auth.GoogleAuthProvider();
     return this.afh.auth.signInWithPopup(provider);
   }

   isLogado() {
      return this.afh.authState;
   }
   
   logout() {
     return this.afh.auth.signOut();
   }
}
