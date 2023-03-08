export interface IView {
  showMenu(options: any): void;
  showInfo(info: string): void;
  showError(msg: string): void;
  putWhiteSpace(): void;
}
