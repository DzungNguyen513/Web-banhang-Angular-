import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/users/register.dto';
import { LoginDTO } from '../dtos/users/login.dto';
import { environment } from '../enviroments/enviroment';
import { UserResponse } from '../responses/user/user.response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.api_url}/users/register`;
  private apiLogin = `${environment.api_url}/users/login`;
  private apiUserDetail = `${environment.api_url}/users/details`;

  private apiConfig = {
    headers : this.createHeaders()
  }
  constructor(private httpClient: HttpClient) {
    
  }
  private createHeaders() {
    return new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': 'vi'});
  }
  Register(registerDTO: RegisterDTO): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.apiRegister, registerDTO, this.apiConfig);
  }
  Login(loginDTO: LoginDTO): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.apiLogin, loginDTO, this.apiConfig);
  }
  getUserDetail(token: string) {
    return this.httpClient.post(this.apiUserDetail, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }
  saveUserResponseToLocalStorage(userResponse?: UserResponse) {
    try {
      debugger
      if(userResponse == null || !userResponse) {
        return;
      }
      // Convert the userResponse object to a JSON string
      const userResponseJSON = JSON.stringify(userResponse);  
      // Save the JSON string to local storage with a key (e.g., "userResponse")
      localStorage.setItem('user', userResponseJSON);  
      console.log('User response saved to local storage.');
    } catch (error) {
      console.error('Error saving user response to local storage:', error);
    }
  }
  getUserResponseFromLocalStorage() {
    try {
      // Retrieve the JSON string from local storage using the key
      const userResponseJSON = localStorage.getItem('user'); 
      if(userResponseJSON == null || userResponseJSON == undefined) {
        return null;
      }
      // Parse the JSON string back to an object
      const userResponse = JSON.parse(userResponseJSON!);  
      console.log('User response retrieved from local storage.');
      return userResponse;
    } catch (error) {
      console.error('Error retrieving user response from local storage:', error);
      return null; // Return null or handle the error as needed
    }
  }
}
