import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventModel } from '../models/eventModel';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EventService {
  private http = inject(HttpClient);
  private baseUrl = environment.api.baseUrl;

  // Visi pasākumi
  getAllEvents(): Observable<HttpResponse<EventModel[]>> {
    return this.http.get<EventModel[]>(`${this.baseUrl}/v1/events`, {
      observe: 'response',
    });
  }

  // Izveidot pasākumu
  createEvent(event: EventModel, creatorId: number): Observable<HttpResponse<EventModel>> {
    return this.http.post<EventModel>(
      `${this.baseUrl}/v1/events?creatorId=${creatorId}`, event,
      { observe: 'response' }
    );
  }

  // Pieteikties
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

  // Mani pasākumi
  getMyEvents(userId: number): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(`${this.baseUrl}/v1/events/my?userId=${userId}`, {
      observe: 'response',
    });
  }

  // Dalībnieku skaits
  getParticipantCount(eventId: number): Observable<HttpResponse<number>> {
    return this.http.get<number>(`${this.baseUrl}/v1/events/${eventId}/count`, {
      observe: 'response',
    });
  }

  // Vai esmu pieteicies?
  isJoined(eventId: number, userId: number): Observable<HttpResponse<boolean>> {
    return this.http.get<boolean>(
      `${this.baseUrl}/v1/events/${eventId}/joined?userId=${userId}`,
      { observe: 'response' }
    );
  }
}