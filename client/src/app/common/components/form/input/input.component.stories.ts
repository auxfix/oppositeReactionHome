import { storiesOf } from '@storybook/angular';
import { FormInputComponent } from './input.component';

storiesOf('form.input', module)
  .add('default', () => ({
    component: FormInputComponent,
  }));
