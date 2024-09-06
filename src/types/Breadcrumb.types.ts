export namespace Breadcrumb {
  export interface Buttons {
    icon: string;
    label?: string;
    action: string;
  }

  export enum Actions {
    LIKE = "like",
    DISLIKE = "dislike",
    GENERATE = "generate",
    CLIPBOARD = "clipboard",
  }

  export interface Icons {
    icon: string;
    action: string;
  }

  export enum IconsActions {
    LIKE = "like",
    DISLIKE = "dislike",
    COPY = "copy",
  }
}