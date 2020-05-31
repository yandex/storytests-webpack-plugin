import { storiesOf } from '@storybook/react';
import React from 'react';

import Accordion from '../index';
import { data } from '../__mocks__/data';

storiesOf('Accordion', module)
  .add('Default', () => <Accordion>{data}</Accordion>)
  .add('No Content', () => <Accordion />)
  .add('With remove control', () => (
    <Accordion>
      {data}
      <button type="button">Remove</button>
    </Accordion>
  ));
