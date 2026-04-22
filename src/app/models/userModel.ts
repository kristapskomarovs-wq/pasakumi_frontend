import { signal, WritableSignal } from '@angular/core';
import { required, SchemaPathTree, validate } from '@angular/forms/signals';

export interface UserLoginModel {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserData {  // Dati, kas tiek saglabāti sesijā pēc login vai reģistrācijas - paroli vairs nevajag
    id: number;
    email: string;
}

export function createUserLoginForm(): WritableSignal<UserLoginModel> {     // Sākotnējās vērtības formai
    return signal<UserLoginModel>({
        email: '',
        password: '',
        confirmPassword: '',
    });
}

export function validateUserLoginForm(s: SchemaPathTree<UserLoginModel>) {   // Validācijas noteikumi formai
    required(s.email, { message: 'E-pasts ir obligāts!' });
    required(s.password, { message: 'Parole ir obligāta!' });
    required(s.confirmPassword, { message: 'Paroles apstiprināšana ir obligāta!' });
    validate(s.confirmPassword, ({ value, valueOf }) => {
        const pass = valueOf(s.password);
        const confirmPass = value();
        if (pass !== confirmPass) {
            return { kind: 'passwordMismatch', message: 'Paroles nesakrīt!' };
        }
        return null;
    });
}