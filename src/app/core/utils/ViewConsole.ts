import { IView } from "../../domain/contracts/IView";

export class ViewConsole implements IView {

  showMenu(options: any): void {
    // Object.values(options).forEach(this.showTheMenu);
    Object.values(options).forEach(option => console.log(option));
  }

  showInfo(info: string): void {
    throw new Error("Method not implemented.");
  }

  showError(msg: string): void {
    throw new Error("Method not implemented.");
  }

  // private showTheMenu(option: any): void {
  //   console.log(option);
  // }

  putWhiteSpace(): void {
    console.log();
  }

}
