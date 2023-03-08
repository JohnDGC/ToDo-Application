import { TaskManagerInMemory } from "./core/services/TaskManagerInMemory";
import { ViewConsole } from "./core/utils/ViewConsole";
import { ViewConsoleOptions } from "./core/utils/ViewConsoleOptions";
import { IConsoleApplication } from "./domain/contracts/IConsole";
import { ConsoleApplication } from "./ui/todoConsole";
import { IWebApplication } from './domain/contracts/IWebApplications';
import { MyWebApplication } from "./ui/todoWeb";
import { Components } from "./core/utils/Components";
import { Events } from "./core/utils/Events";

class Application {

  // private appConsole: IConsoleApplication;
  private appConsole: IWebApplication;
  private component: Components;

  constructor(appConsole: IWebApplication, component: Components) {
    this.appConsole = appConsole;
    this.component = component;
  }
  // constructor(appConsole: IConsoleApplication) {
  //   this.appConsole = appConsole;
  // }

  startMyAppConsole(): void {
    this.appConsole.start();
  }

  initWebApplication(rootContainer: string): Application {
    this.component.setRootComponent(rootContainer, 'index');
    return this;

    // let root: HTMLElement = document.getElementById(rootContainer);
    // // root.innerHTML = '<object type="text/html" data="./src/app/ui/todoWeb/index.html" ></object>';

    // async function getResponse() {
    //   const response = await fetch('/src/app/ui/todoWeb/index.html');
    //   const elem = await response.text();
    //   return root.innerHTML = elem;
    // }

    // getResponse();
    // this.appConsole.start();

    // fetch('/src/app/ui/todoWeb/index.html')
    //   .then(res => { return res.text() })
    //   .then(elem => {
    //     console.log(elem);
    //     document.getElementById(rootContainer).innerHTML = elem
    //   })
    // this.appConsole.start();
  }

  initComponents(): void {
    this.appConsole.start();
  }
}

const app = new Application(
  new MyWebApplication(new Components, new Events, new TaskManagerInMemory),
  new Components);
// const app = new Application(new ConsoleApplication(new TaskManagerInMemory, new ViewConsole, new ViewConsoleOptions));

export default app;
