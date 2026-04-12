import { Component, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

@Component({
  selector: 'app-error-validation',
  imports: [],
  templateUrl: './error-validation.html',
})
export class ErrorValidation {
  fieldState = input.required<FieldState<any, string>>();
}