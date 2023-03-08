export class Events {
  click(selector: string, action: any): void {
    document.querySelector(selector).addEventListener('click', action);
  }
  keyup(action: any): void {
    document.addEventListener('keyup', action);
  }
}
