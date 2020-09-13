declare namespace Platform {
  interface IRoute {
    path: string;
    Page: JSX.Element | React.ReactNode;
    exact?: boolean;
    isPrivate?: boolean;
    layout?: 'WithSidebar' | 'Auth';
    shortName: string;
  }
}
