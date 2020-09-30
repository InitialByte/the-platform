declare namespace Platform {
  interface IRoute {
    path: string;
    Page: React.LazyExoticComponent<React.FC<Record<string, unknown>>>;
    exact?: boolean;
    isPrivate?: boolean;
    onlyForNotAuth?: boolean;
    title?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Icon?: any;
    layout?: 'WithSidebar' | 'Auth';
    shortName: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children?: any;
  }
}
