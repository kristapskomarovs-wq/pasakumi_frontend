import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventModel } from '../models/eventModel';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EventService {
  private http = inject(HttpClient);
  private baseUrl = environment.api.baseUrl;

  // Visi pasākumi - atgriež sarakstu ar visiem pasākumiem
  getAllEvents(): Observable<HttpResponse<EventModel[]>> {
    return this.http.get<EventModel[]>(`${this.baseUrl}/v1/events`, {
      observe: 'response',
    });
  }

  // Izveidot pasākumu - atgriež izveidoto pasākumu ar ID un creator info
  createEvent(event: EventModel, creatorId: number): Observable<HttpResponse<EventModel>> {
    return this.http.post<EventModel>(
      `${this.baseUrl}/v1/events?creatorId=${creatorId}`, event,
      { observe: 'response' }
    );
  }

  // Pieteikties - atgriež ziņu par pieteikšanos
  joinEvent(eventId: number, userId: number): Observable<HttpResponse<string>> {
    return this.http.post(`${this.baseUrl}/v1/events/${eventId}/join?userId=${userId}`, null, {
      observe: 'response',
      responseType: 'text',
    });
  }

  // Atcelt dalību
  leaveEvent(eventId: number, userId: number): Observable<HttpResponse<string>> {
    return this.http.delete(`${this.baseUrl}/v1/events/${eventId}/leave?userId=${userId}`, {
      observe: 'response',
      responseType: 'text',
    });
  }

  // Mani pasākumi - saraksts ar pasākumiem, kuros esmu dalībnieks vai ko esmu izveidojis
  getMyEvents(userId: number): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(`${this.baseUrl}/v1/events/my?userId=${userId}`, {
      observe: 'response',
    });
  }

  // Dalībnieku skaits - atgriež dalībnieku skaitu konkrētam pasākumam
  getParticipantCount(eventId: number): Observable<HttpResponse<number>> {
    return this.http.get<number>(`${this.baseUrl}/v1/events/${eventId}/count`, {
      observe: 'response',
    });
  }

  // Vai esmu pieteicies? - atgriež true/false
  isJoined(eventId: number, userId: number): Observable<HttpResponse<boolean>> {
    return this.http.get<boolean>(
      `${this.baseUrl}/v1/events/${eventId}/joined?userId=${userId}`,
      { observe: 'response' }
    );
  }
  deleteEvent(eventId: number, creatorId: number): Observable<HttpResponse<string>> { // Dzēst pasākumu, atgriež ziņu par dzēšanu
    return this.http.delete(
        `${this.baseUrl}/v1/events/${eventId}?creatorId=${creatorId}`,
        { observe: 'response', responseType: 'text' }
    );
}

}