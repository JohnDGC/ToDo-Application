import scanf from "scanf";
import { IConsoleOptions } from "../../domain/contracts/IConsoleOptions";

export class ViewConsoleOptions implements IConsoleOptions {

  getName(): string {
    console.clear();
    console.log('Enter the task name: ');
    let nameTask = scanf('%S');
    return nameTask;
  }

  getDesc(): string {
    console.log('\n', 'Enter the task description: ');
    let descTask = scanf('%S');
    return descTask;
  }

  getUpdateName(): string {
    console.log('Update name:');
    let newName = scanf('%S');
    return newName;
  }

  getUpdateDesc(): string {
    console.log('Update description:');
    let newDesc = scanf('%S')
    return newDesc;
  }

  getIndex(): number {
    console.log('\n', 'Enter the task index to delete:');
    let index = scanf('%d');
    return index;
  }

  getValidationDelete(): string {
    console.log('Are you sure to delete the task? (y/n)');
    let option = scanf('%S');
    return option;
  }
}
