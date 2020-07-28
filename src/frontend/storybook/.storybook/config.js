import {configure, addParameters} from "@storybook/react";

configure(require.context('../src', true, /\.stories\.tsx$/), module);

addParameters({
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(
            b[1].id,
            undefined,
            {numeric: true},
          ),
  },
});

addParameters({
  backgrounds: [
    {
      name: 'twitter',
      value: '#00aced',
      default: true,
    },
    {
      name: 'facebook',
      value: '#3b5998',
    },
  ],
});
