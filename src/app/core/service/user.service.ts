import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserCommunicateStatus } from '../models/UserCommunicateStatus';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly fireStore: AngularFirestore;
  private readonly fireStorage: AngularFireStorage;

  constructor(
    fireStore: AngularFirestore,
    fireStorage: AngularFireStorage,
  ) {
    this.fireStorage = fireStorage;
    this.fireStore = fireStore;
  }

  async getUsers(lastDate?: number): Promise<User[]> {
    // return this.fireStore.collection<User>('users').valueChanges({ idField: 'id' });

    let query = this.fireStore.collection<User>('users').ref
      .orderBy('registerDate')

    if (lastDate) {
      query = query.startAfter(lastDate).limit(3);
    }

    const data = await (await query.get()).docs.map(item => {
      return {
        ...item.data() as User,
        id: item.id
      }
    });


    for (let index = 0; index < 20; index++) {
      data.push({
        email: 'yunusemre@gmail.com',
        username: 'berkay',
        password: '21352131',
        registerDate: 553566,
        status: 2,
        id: '2'
      });
    }

    return data as User[];
  }



  get(id: string): Observable<User> {
    return this.fireStore.collection('users').doc<User>(id).valueChanges();
  }

  updateCommunicateStatus(userId: string, status: UserCommunicateStatus) {
    this.fireStore.collection('users').doc(userId).ref.update({ status: status });
  }

}
