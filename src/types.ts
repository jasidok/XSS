// extension-ui internal notification event
export enum UiEvent {
  EMIT_CODE = 'EMIT_CODE',
}

export enum MenuItemId {
  ABOUT_XSS = 'about-xss',
  EXPORT_SCRIPTS = 'export-scripts',
}

export interface IScriptItem {
  title: string;
  code: string;
  // Execute immediately when refreshing the page
  autoExecute: boolean;
}

export interface ISetting {
  dark: boolean;
  notice: boolean;
}

export enum StyleTheme {
  LIGHT = 'light',
  DARK = 'dark',
}
export enum UiEvent {
  EMIT_CODE = 'EMIT_CODE',
}

export enum MenuItemId {
  ABOUT_XSS = 'about-xss',
  EXPORT_SCRIPTS = 'export-scripts',
}

export interface IScriptItem {
  title: string;
  code: string;
  // Execute immediately when refreshing the page
  autoExecute: boolean;
}

export interface ISetting {
  dark: boolean;
  notice: boolean;
}

export enum StyleTheme {
  LIGHT = 'light',
  DARK = 'dark',
}
