import { NgModule } from '@angular/core';
import { InitialsPipe } from './pipes/initials.pipe';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  TranslateLoader,
  TranslateModule,
  TranslateStore,
} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MATERIAL_COMPONENTS } from './modules/material';
import { SHARED_PIPES } from './pipes';
import { SHARED_COMPONENTS } from './components';
import { DIRECTIVES } from './directives';

export function HttpLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [...SHARED_PIPES, ...SHARED_COMPONENTS, ...DIRECTIVES],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ...MATERIAL_COMPONENTS,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [TranslateStore],
  bootstrap: [],
  exports: [
    TranslateModule,
    ...SHARED_PIPES,
    ...SHARED_COMPONENTS,
    ...DIRECTIVES,
    ...MATERIAL_COMPONENTS,
  ],
})
export class SharedModule {}
