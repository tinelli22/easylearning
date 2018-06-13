import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Professor } from '../model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  pathProf = 'professores';

  constructor(
    private afh: AngularFireAuth,
    private afs: AngularFirestore,
  ) { }


  buscarDados(id) {
    return this.afs.collection(this.pathProf).doc(id).valueChanges();
  }
  
  salvarDados(prof: Professor) {
    return this.afs.collection(this.pathProf).doc(prof.id).set(JSON.parse(JSON.stringify(prof)));
  }

  getAllProfs() {
    return this.afs.collection(this.pathProf).valueChanges();
  }

  agendarAula(prof: Professor, requisitante: Professor) {
    return this.afs.collection(this.pathProf).doc(prof.id).collection('solicitacoes').add({
      profOrigin: requisitante,
      profTo: prof
    });
  }
}
