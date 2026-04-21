import { Component, inject, OnInit, signal } from '@angular/core';
import { EventService } from '../services/event';
import { UserDataService } from '../services/user-data';
import { EventModel } from '../models/eventModel';
import { Navbar } from '../navbar/navbar';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-events',
  imports: [Navbar],
  templateUrl: './events.html',
})
export class EventsComponent implements OnInit {
  private eventService = inject(EventService);
  private userDataService = inject(UserDataService);

  events = signal<EventModel[]>([]);
  userData = this.userDataService.getUserData();

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (r) => {
        const eventList = r.body ?? [];
        if (!eventList.length) {
          this.events.set([]);
          return;
        }

        forkJoin(
          eventList.map((event) =>
            forkJoin({
              countRes: this.eventService.getParticipantCount(event.id!),
              joinedRes: this.eventService.isJoined(event.id!, this.userData.id),
            })
          )
        ).subscribe({
          next: (details) => {
            const enriched = eventList.map((event, index): EventModel => {
              const currentParticipants = details[index].countRes.body ?? 0;
              return {
                ...event,
                currentParticipants,
                isJoined: details[index].joinedRes.body ?? false,
                isFull: currentParticipants >= event.maxParticipants,
              };
            });

            this.events.set(enriched);
          },
          error: () => alert('Kļūda ielādējot pasākumu informāciju!')
        });
      },
      error: () => alert('Kļūda ielādējot pasākumus!')
    });
  }

  onJoin(eventId: number) {
    this.eventService.joinEvent(eventId, this.userData.id).subscribe({
      next: () => {
        alert('Veiksmīgi pieteicies! ✅');
        this.loadEvents();
      },
      error: (err) => alert(err.error || 'Pieteikšanās neizdevās!')
    });
  }

  onLeave(eventId: number) {
    this.eventService.leaveEvent(eventId, this.userData.id).subscribe({
      next: () => {
        alert('Dalība atcelta! 🗑️');
        this.loadEvents();
      },
      error: (err) => alert(err.error || 'Atcelšana neizdevās!')
    });
  }

}