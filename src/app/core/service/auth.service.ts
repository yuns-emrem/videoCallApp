import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth'
import * as firebase from 'firebase';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn :'root'
})
export class AuthService {

  currentUserJson: any = null;
  public isProcces: boolean;
  private readonly fireAuth: AngularFireAuth;
  private readonly fireStore: AngularFirestore;
  private readonly localStorage:LocalStorageService;


  constructor(
    fireAuth: AngularFireAuth,
    fireStore: AngularFirestore,
    localStorage:LocalStorageService,
  ) {
    this.fireAuth = fireAuth;
    this.fireStore = fireStore;
    this.localStorage = localStorage;
  }


  public async signup(email: string, password: string, name: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.localStorage.setUser(JSON.stringify(res.user));
        this.isProcces = true
        this.fireStore.collection('users').doc(res.user.uid).set({
          email: email,
          userName: name,
          registerDate: firebase.default.firestore.Timestamp.now().toMillis()
        })
      })
  }

  public async signin(email: string, password: string) {
    await this.fireAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.localStorage.setUser(JSON.stringify(res.user));
        this.isProcces = true
      })
  }

  logOut() {
    this.fireAuth.signOut();
    this.localStorage.removeUser();
    this.currentUserJson = null;
  }

  setCurrentUser() {
    this.currentUserJson = JSON.parse(this.localStorage.getUser());
  }

  getCurrentUser() {
    return this.fireStore.collection('users').doc(this.getUserId()).ref.get();
  }

  isLoggedIn(): boolean {
    return this.currentUserJson !== null ? !this.currentUserJson.isAnonymous : false;
  }

  getUserId() {
    return this.currentUserJson !== null ? this.currentUserJson.uid : '';
  }


}





