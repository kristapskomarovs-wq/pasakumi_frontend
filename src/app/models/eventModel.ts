import { signal, WritableSignal } from '@angular/core';
import { required, SchemaPathTree, validate } from '@angular/forms/signals';

export interface EventModel {  // Kā dati tiek saņemti no API un attēloti sarakstā
    id?: number;
    title: string;
    description: string;
    eventDate: string;
    eventTime: string;
    location: string;
    maxParticipants: number;
    creator?: {
        id: number;
        email: string;
    };
    currentParticipants?: number;
    isJoined?: boolean;
    isFull?: boolean;
}

export interface EventFormModel { // ko lietotājs aizpilda formā 
    title: string;
    description: string;
    eventDate: string;
    eventTime: string;
    location: string;
    maxParticipants: number;
}

export function createEventForm(): WritableSignal<EventFormModel> { // Sākotnējās vērtības formai
    return signal<EventFormModel>({
        title: '',
        description: '',
        eventDate: '',
        eventTime: '',
        location: '',
        maxParticipants: 10,
    });
}

export function validateEventForm(s: SchemaPathTree<EventFormModel>) { // Validācijas noteikumi formai
    required(s.title, { message: 'Nosaukums ir obligāts!' });
    required(s.eventDate, { message: 'Datums ir obligāts!' });
    required(s.eventTime, { message: 'Laiks ir obligāts!' });
    required(s.location, { message: 'Vieta ir obligāta!' });

    // Datums nedrīkst būt pagātnē
    validate(s.eventDate, ({ value }) => {
        const dateVal = value();
        if (!dateVal) return null;
        const today = new Date().toISOString().split('T')[0];
        if (dateVal < today) {
            return { kind: 'pastDate', message: 'Datums nevar būt pagātnē!' };
        }
        return null;
    });

    // Max dalībnieki >= 1
    validate(s.maxParticipants, ({ value }) => {
        const val = value();
        if (val < 1) {
            return { kind: 'minParticipants', message: 'Dalībnieku skaits vismaz 1!' };
        }
        return null;
    });
}