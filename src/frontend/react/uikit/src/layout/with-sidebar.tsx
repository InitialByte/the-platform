import * as React from 'react';
import {FC} from 'react';

export const WithSidebarLayout: FC = ({children}) => (
  <>
    <h1>TestSidebar</h1>
    <div>{children}</div>
  </>
);
