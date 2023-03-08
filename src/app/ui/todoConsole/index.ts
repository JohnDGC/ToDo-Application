import scanf from "scanf";
import { MenuOptions } from "../../core/constants/menu.options.enum";
import { IConsoleApplication } from "../../domain/contracts/IConsole";
import { TodoDto } from "../../domain/dto/TodoDto";
import { ITodoConsoleRepositorie } from "../../domain/repositories/ITodoConsoleRepositorie";
import { ExitStatus } from "typescript";
import { ConsoleMenu } from "./components/menu.enum";
import { enter } from "./components/enter.enum";
import { IView } from "../../domain/contracts/IView";
import { IConsoleOptions } from "../../domain/contracts/IConsoleOptions";

let op: number, index: number, validate: string;

export class ConsoleApplication implements IConsoleApplication {

  private taskManager: ITodoConsoleRepositorie<TodoDto>;
  private view: IView;
  private consoleOptions: IConsoleOptions;

  constructor(taskManager: ITodoConsoleRepositorie<TodoDto>, view: IView, consoleOptions: IConsoleOptions) {
    this.taskManager = taskManager;
    this.view = view;
    this.consoleOptions = consoleOptions;
  }

  start(): void {
    this.startMenu();
  }

  private startMenu(): void {
    this.view.showMenu(ConsoleMenu)
    this.view.putWhiteSpace();
    console.log('Choose an option:')
    this.getOption(op = scanf('%d'));
  }

  private getOption(option: number): void {
    const taskList = this.taskManager.read();
    switch (option) {
      case MenuOptions.create:
        this.taskManager.create({ name: this.consoleOptions.getName(), description: this.consoleOptions.getDesc(), createdAt: new Date() });
        enter();
        this.getOption(op = scanf('%d'));
        break;

      case MenuOptions.read:
        taskList.forEach((task, index) => console.log(`${index + 1}. ${task.name}: ${task.description}`));
        this.view.putWhiteSpace();
        enter();
        this.getOption(op = scanf('%d'));
        break;

      case MenuOptions.update:
        taskList.forEach((task, index) => console.log(`${index + 1}. ${task.name}: ${task.description}`));
        index = this.consoleOptions.getIndex();

        if (!Number(index) || (index < taskList.length || index > taskList.length)) {
          console.log('\n', 'Invalid');
        } else {
          let myNewTask: TodoDto;
          myNewTask = { name: this.consoleOptions.getUpdateName(), description: this.consoleOptions.getUpdateDesc(), createdAt: new Date() };
          this.taskManager.update(index - 1, myNewTask);
        }
        enter();
        this.getOption(op = scanf('%d'));
        break;

      case MenuOptions.delete:
        taskList.forEach((task, index) => console.log(`${index + 1}. ${task.name}: ${task.description}`));

        if (this.consoleOptions.getIndex() < taskList.length + 1) {
          validate = this.consoleOptions.getValidationDelete();

          if (validate === 'n') {
            console.clear();
            taskList.forEach((task, index) => console.log(`${index + 1}. ${task.name}: ${task.description}`));
            console.log('\nReturning');
          } else if (validate === 'y') {
            console.clear();
            this.taskManager.delete(index - 1);
            if (!taskList.length)
              console.log('Task list empty')
            else {
              taskList.forEach((task, index) => console.log(`${index + 1}. ${task.name}: ${task.description}`));
              console.log('\nDeleted');
            }
          }
        } else console.log('\nInvalid');
        enter();
        this.getOption(op = scanf('%d'));
        break;

      case MenuOptions.close:
        console.clear(); console.log('Finishing...');
        ExitStatus
        break;
    }
  }
}
