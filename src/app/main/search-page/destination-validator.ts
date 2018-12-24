import { AbstractControl } from '@angular/forms';

export function DestinationValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const origin = control.get('origin');
  const destination = control.get('destination');
  if (origin.pristine || destination.pristine) {
    return null;
  }
  return origin && destination && origin.value === destination.value ? { 'misMatch': true } : null;
}