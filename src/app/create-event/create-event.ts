import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../services/event';
import { UserDataService } from '../services/user-data';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-create-event',
  imports: [FormsModule, Navbar],
  templateUrl: './create-event.html',
})
export class CreateEventComponent {
  private eventService = inject(EventService);
  private userDataService = inject(UserDataService);
  private router = inject(Router);

  title = '';
  description = '';
  eventDate = '';
  eventTime = '';
  location = '';
  maxParticipants = 10;
  errorMessage = signal('');

  // Minimālais datums — šodiena (priekš HTML input[type=date] min atribūta)
  today = new Date().toISOString().split('T')[0];

  onSubmit() {
    // ── Frontend validācija ──
    if (!this.title.trim()) { this.errorMessage.set('Nosaukums ir obligāts!'); return; }
    if (!this.eventDate) { this.errorMessage.set('Datums ir obligāts!'); return; }
    if (this.eventDate < this.today) { this.errorMessage.set('Datums nevar būt pagātnē!'); return; }
    if (!this.eventTime) { this.errorMessage.set('Laiks ir obligāts!'); return; }
    if (!this.location.trim()) { this.errorMessage.set('Vieta ir obligāta!'); return; }
    if (this.maxParticipants < 1) { this.errorMessage.set('Dalībnieku skaits vismaz 1!'); return; }

    const event = {
      title: this.title,
      description: this.description,
      eventDate: this.eventDate,
      eventTime: this.eventTime,
      location: this.location,
      maxParticipants: this.maxParticipants,
      imageUrl: ''
    };

    const userId = this.userDataService.getUserData().id;

    this.eventService.createEvent(event, userId).subscribe({
      next: (r) => {
        if (r.status === 201) {
          alert('Pasākums izveidots! ✅');
          this.router.navigateByUrl('/events');
        }
      },
      error: (err) => {
        this.errorMessage.set(err.error || 'Kļūda veidojot pasākumu!');
      }
    });
  }
}