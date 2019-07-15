import { storiesOf, moduleMetadata  } from '@storybook/angular';
import { MatIconModule } from '@angular/material/icon';
import { RoundButtonComponent } from './round-button.component';

storiesOf('round-button', module)
  .addDecorator(moduleMetadata({
    imports: [
      MatIconModule,
    ],
    declarations: [
      RoundButtonComponent,
    ],
  }))
  .add('default', () => ({
    component: RoundButtonComponent,
    props: {
      icon: 'clear'
    },
  }))
  .add('custom styles', () => ({
    component: RoundButtonComponent,
    props: {
      icon: 'clear',
      customStyles: {width: '5rem', height: '5rem'}
    },
  }));

