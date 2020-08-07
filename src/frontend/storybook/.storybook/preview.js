import {addParameters} from '@storybook/react';
import {setDefaults} from '@storybook/addon-info';

addParameters({
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, {numeric: true}),
  },
});

setDefaults({
  header: false,
  propTables: null,
});
