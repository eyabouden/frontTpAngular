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

@Component({
  selector: 'app-researcher-dashboard',
  standalone: true,
  imports: [
    CommonModule,
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
    IconModule,
    ListGroupModule,
    NavModule,
    SidebarModule,
    WidgetModule,
    UtilitiesModule
  ],
  providers: [IconSetService],
  templateUrl:'./researchers-management.component.html',
  styleUrls: ['./researcher-dashboard.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ResearcherDashboardComponent implements OnInit {
  stats = {
    myPublications: 24,
    totalViews: 1568,
    citations: 89,
    collaborators: 12
  };

  recentPublications = [
    { 
      title: 'Advancements in Quantum Machine Learning', 
      date: 'Published: May 15, 2023', 
      views: 245, 
      citations: 12 
    },
    { 
      title: 'Neural Networks for Medical Diagnosis', 
      date: 'Published: March 8, 2023', 
      views: 189, 
      citations: 8 
    },
    { 
      title: 'Blockchain in Healthcare Systems', 
      date: 'Published: January 22, 2023', 
      views: 132, 
      citations: 5 
    }
  ];

  recommendedResearch = [
    { 
      title: 'Deep Learning for Image Recognition', 
      author: 'Dr. Smith et al.', 
      domain: 'AI', 
      date: '2023-06-10' 
    },
    { 
      title: 'Sustainable Energy Solutions', 
      author: 'Prof. Johnson', 
      domain: 'Energy', 
      date: '2023-05-28' 
    },
    { 
      title: 'CRISPR Gene Editing Advances', 
      author: 'Dr. Lee', 
      domain: 'Biotech', 
      date: '2023-06-02' 
    },
    { 
      title: 'Quantum Computing Breakthroughs', 
      author: 'Dr. Chen', 
      domain: 'Quantum', 
      date: '2023-05-15' 
    },
    { 
      title: 'Climate Change Models', 
      author: 'Dr. Wilson', 
      domain: 'Climate', 
      date: '2023-06-05' 
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void { }
 
  //openUploadModal(): void {
   // const uploadModal = new Modal(document.getElementById('uploadModal')!);
   // uploadModal.show();
  //}
}