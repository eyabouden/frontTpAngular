import { Component, OnInit } from '@angular/core';

interface Researcher {
  id: number;
  name: string;
  email: string;
  institution: string;
  domain: string;
  publications: number;
  status: string;
}

@Component({
  selector: 'app-researchers-management',
  templateUrl: './researchers-management.component.html',
 // styleUrls: ['./researchers-management.component.scss']
})
export class ResearchersManagementComponent implements OnInit {
  researchers: Researcher[] = [];
  filteredResearchers: Researcher[] = [];
  searchTerm: string = '';
  statusFilter: string = 'all';

  constructor() { }

  ngOnInit(): void {
    // Mock data
    this.researchers = [
      { id: 1, name: 'Dr. Anweesha Banerjee', email: 'anweesha@example.com', institution: 'MIT', domain: 'AI Research', publications: 24, status: 'active' },
      { id: 2, name: 'Prof. John Smith', email: 'jsmith@example.com', institution: 'Stanford University', domain: 'Quantum Computing', publications: 37, status: 'active' },
      { id: 3, name: 'Dr. Maria Rodriguez', email: 'mrodriguez@example.com', institution: 'Harvard', domain: 'Medical Research', publications: 18, status: 'pending' },
      { id: 4, name: 'Prof. David Chen', email: 'dchen@example.com', institution: 'Berkeley', domain: 'Engineering', publications: 42, status: 'active' },
      { id: 5, name: 'Dr. Sarah Johnson', email: 'sjohnson@example.com', institution: 'Oxford', domain: 'Environmental Science', publications: 29, status: 'inactive' }
    ];
    
    this.filteredResearchers = [...this.researchers];
  }

  filterResearchers(): void {
    this.filteredResearchers = this.researchers.filter(researcher => {
      const matchesSearch = this.searchTerm === '' || 
        researcher.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        researcher.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        researcher.institution.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        researcher.domain.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = this.statusFilter === 'all' || researcher.status === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.filterResearchers();
  }

  onStatusFilterChange(status: string): void {
    this.statusFilter = status;
    this.filterResearchers();
  }

  deleteResearcher(id: number): void {
    // In a real app, you would call a service to delete the researcher
    this.researchers = this.researchers.filter(r => r.id !== id);
    this.filterResearchers();
  }
}