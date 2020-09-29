declare namespace Platform {
  interface IRoute {
    path: string;
    Page: JSX.Element | React.ReactNode;
    exact?: boolean;
    isPrivate?: boolean;
    title?: string;
    Icon?: JSX.Element | React.ReactNode;
    layout?: 'WithSidebar' | 'Auth';
    shortName: string;
  }
}
