import { FormControl } from '@angular/forms';

export interface NewHeroeForm {
  firstName: FormControl<string | any>;
  lastName: FormControl<string | any>;
}

export interface EditHeroeForm {
  id: FormControl<string | any>;
  firstName: FormControl<string | any>;
  lastName: FormControl<string | any>;
}
