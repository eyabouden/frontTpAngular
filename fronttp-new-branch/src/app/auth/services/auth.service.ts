import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { LoginRequest, RegisterRequest, LoginResponse, Role } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'authToken';  // Consistent key for token storage
  private currentUserSubject = new BehaviorSubject<LoginResponse | null>(this.loadUserFromStorage());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  // 🔹 Load user from localStorage (called once at service initialization)
  private loadUserFromStorage(): LoginResponse | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginRequest)
      .pipe(
        tap(response => this.storeUser(response))
      );
  }
  testConnection(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`);
  }
  register(registerRequest: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/register`, 
      registerRequest,
      { observe: 'response' }  // Get full HTTP response
    ).pipe(
      map(response => {
        if (response.body?.token) {
          this.storeUser(response.body);
          return response.body;
        }
        throw new Error('Invalid response format');
      }),
      catchError(error => {
        console.error('Full error object:', error);  // Debugging
        if (error.status === 0) {
          throw new Error('Network error: Could not connect to server. Please check:'
            + '\n1. Backend server is running'
            + '\n2. No CORS issues'
            + '\n3. Correct API URL');
        }
        throw new Error(error.error?.message || error.message || 'Registration failed');
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem(this.tokenKey);  // Also remove token
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): LoginResponse | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  hasRole(role: Role): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private storeUser(user: LoginResponse): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem(this.tokenKey, user.token);  // Store token separately
    this.currentUserSubject.next(user);
  }
}
