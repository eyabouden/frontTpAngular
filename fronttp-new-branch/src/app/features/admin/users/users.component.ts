// users.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CardModule, TableModule, BadgeModule, ButtonModule, SpinnerModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserService } from './user.service';
import {  IconSetService } from '@coreui/icons-angular';
import { cilTrash } from '@coreui/icons';
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  employmentDate: Date;
  originalEstablishment: string;
  lastDiploma: string;
  grade: string;
  role: string;
}

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    BadgeModule,
    ButtonModule,
    SpinnerModule,
    IconModule,
    
    
  ],
  providers: [UserService,IconSetService],
  templateUrl: './users.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
 // styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading = true;
  error: string | null = null;

  constructor(private userService: UserService ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers()
      .subscribe({
        next: (data) => {
          this.users = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load users. Please try again.';
          this.loading = false;
          console.error('Error loading users:', err);
        }
      });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id)
        .subscribe({
          next: () => {
            this.users = this.users.filter(user => user.id !== id);
          },
          error: (err) => {
            console.error('Error deleting user:', err);
            alert('Failed to delete user. Please try again.');
          }
        });
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
}