import { Component, inject, OnInit, signal } from '@angular/core';
import { EventService } from '../services/event';
import { UserDataService } from '../services/user-data';
import { Navbar } from '../navbar/navbar';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-my-events',
  imports: [Navbar, DatePipe],
  templateUrl: './my-events.html',
})
export class MyEventsComponent implements OnInit {
  private eventService = inject(EventService);
  private userDataService = inject(UserDataService);
  
  myRegistrations = signal<any[]>([]);
  userData = this.userDataService.getUserData();

  ngOnInit() {
    this.loadMyEvents();
  }

  loadMyEvents() {
  console.log('loadMyEvents called, userId:', this.userData.id);
  this.eventService.getMyEvents(this.userData.id).subscribe({
    next: (r) => {
      this.myRegistrations.set(r.body ?? []);
    },
    error: (err) => {
      alert('Kļūda ielādējot pasākumus!');
    }
  });
}

  onLeave(eventId: number) {
    this.eventService.leaveEvent(eventId, this.userData.id).subscribe({
      next: () => {
        alert('Dalība atcelta!');
        this.loadMyEvents();
      },
      error: (err) => alert(err.error || 'Atcelšana neizdevās!')
    });
  }
  onDelete(eventId: number) {
  if (!confirm('Dzēst pasākumu? Visi pieteikumi tiks atcelti!')) return;

  this.eventService.deleteEvent(eventId, this.userData.id).subscribe({
    next: () => {
      alert('Pasākums dzēsts! 🗑️');
      this.loadMyEvents();
    },
    error: (err) => alert(err.error || 'Kļūda dzēšot pasākumu!')
  });
}
}