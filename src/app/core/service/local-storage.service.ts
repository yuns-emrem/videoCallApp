import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(itemName: string, value: any) {
    localStorage.setItem(itemName, value);
  }

  removeItem(itemName: string) {
    localStorage.removeItem(itemName);
  }

  setUser(data: string) {
    localStorage.setItem("user", data);
  }

  removeUser() {
    localStorage.removeItem("user");
  }

  getUser(): string {
    return localStorage.getItem("user");
  }
}
