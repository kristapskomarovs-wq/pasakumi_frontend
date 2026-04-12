import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { EventService } from '../services/event';
import { UserDataService } from '../services/user-data';
import { Navbar } from '../navbar/navbar';
import { ErrorValidation } from '../error-validation/error-validation';
import { createEventForm, validateEventForm } from '../models/eventModel';

@Component({
  selector: 'app-create-event',
  imports: [FormField, Navbar, ErrorValidation],
  templateUrl: './create-event.html',
})
export class CreateEventComponent {
  private eventService = inject(EventService);
  private userDataService = inject(UserDataService);
  private router = inject(Router);

  eventSignal = signal({
    event: createEventForm()(),
  });

  eventForm = form(this.eventSignal, (v) => {
    validateEventForm(v.event);
  });

  errorMessage = signal('');
  today = new Date().toISOString().split('T')[0];

  onSubmit() {
    const eventData = this.eventForm().value().event;

    // Pārbaudīt vai forma ir valīda
    if (!eventData.title.trim() || !eventData.eventDate || !eventData.eventTime || !eventData.location.trim()) {
      this.errorMessage.set('Aizpildiet visus obligātos laukus!');
      return;
    }
    if (eventData.eventDate < this.today) {
      this.errorMessage.set('Datums nevar būt pagātnē!');
      return;
    }
    if (eventData.maxParticipants < 1) {
      this.errorMessage.set('Dalībnieku skaits vismaz 1!');
      return;
    }

    const userId = this.userDataService.getUserData().id;

    this.eventService.createEvent(eventData as any, userId).subscribe({
      next: (r) => {
        if (r.status === 201) {
          alert('Pasākums izveidots! ✅');
          this.router.navigateByUrl('/events');
        }
      },
      error: (err) => {
        this.errorMessage.set(err.error || 'Kļūda veidojot pasākumu!');
      },
    });
  }
}