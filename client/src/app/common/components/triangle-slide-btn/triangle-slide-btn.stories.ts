import { storiesOf, moduleMetadata  } from '@storybook/angular';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TriangleSlideBtnComponent } from './triangle-slide-btn.component';

import '!style-loader!css-loader!./story-styles.css';

storiesOf('triangle-slide-btn', module)
  .addDecorator(moduleMetadata({
    imports: [
      MatIconModule,
      BrowserAnimationsModule,
    ],
    declarations: [
      TriangleSlideBtnComponent,
    ],
  }))
  .add('default', () => ({
    component: TriangleSlideBtnComponent,
  }));

