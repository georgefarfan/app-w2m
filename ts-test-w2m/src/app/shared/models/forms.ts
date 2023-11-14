import { FormControl } from '@angular/forms';

export interface NewHeroForm {
  heroName: FormControl<string | any>;
  firstName: FormControl<string | any>;
  lastName: FormControl<string | any>;
  description: FormControl<string | any>;
}

export interface EditHeroForm {
  id: FormControl<string | any>;
  heroName: FormControl<string | any>;
  firstName: FormControl<string | any>;
  lastName: FormControl<string | any>;
  description: FormControl<string | any>;
}
