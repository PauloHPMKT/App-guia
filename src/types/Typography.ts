export namespace Typography {
  export type Tags = 'h1' | 'h2' | 'h3' | 'body' | 'caption';

  export interface Props {
    tag: string;
    variant?: Tags;
    class?: string;
  }
}
