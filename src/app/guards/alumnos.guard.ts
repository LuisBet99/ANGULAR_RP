import { CanActivateFn } from '@angular/router';

export const alumnosGuard: CanActivateFn = (route, state) => {
  return true;
};
