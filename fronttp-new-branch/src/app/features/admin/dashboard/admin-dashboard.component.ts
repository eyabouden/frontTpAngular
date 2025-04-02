import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
// Import CoreUI modules
import { 
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  SidebarModule,
  WidgetModule,
  UtilitiesModule,
 
} from '@coreui/angular';

// Import CoreUI Icons
import { IconModule, IconSetService } from '@coreui/icons-angular';

// Don't import BrowserModule in a component
// BrowserModule should only be imported in the main AppModule
// Remove these imports:
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    // Remove these:
    // BrowserAnimationsModule,
    // BrowserModule,
    
    // CoreUI Modules
    AvatarModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FooterModule,
    FormModule,
    GridModule,
    HeaderModule,
     // Add this for c-header-toggler
    IconModule,
    ListGroupModule,
    NavModule,
    SidebarModule,
      // Add this for c-sidebar-nav-item
    WidgetModule,
    UtilitiesModule
  ],
  providers: [IconSetService],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    totalUsers: 1243,
    totalResearchers: 587,
    totalPublications: 3214,
    totalDomains: 45,
    pendingPublications: 27,
    pendingUsers: 12
  };

  recentActivity = [
    { type: 'publication', action: 'added', title: 'Quantum Computing Applications in Medical Research', user: 'Dr. Smith', time: '2 hours ago' },
    { type: 'user', action: 'registered', name: 'Jane Doe', role: 'Researcher', time: '5 hours ago' },
    { type: 'publication', action: 'pending', title: 'AI Ethics in Modern Society', user: 'Prof. Johnson', time: '1 day ago' },
    { type: 'domain', action: 'added', name: 'Biomedical Engineering', time: '2 days ago' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void { }
}