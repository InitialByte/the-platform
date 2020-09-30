declare namespace Platform {
  interface IRoute {
    path: string;
    Page: typeof React.Component;
    exact?: boolean;
    isPrivate?: boolean;
    onlyForNotAuth?: boolean;
    title?: string;
    Icon?: typeof React.Component;
    layout?: 'WithSidebar' | 'Auth';
    shortName: string;
    children: JSX.Element[] | JSX.Element;
  }
}
