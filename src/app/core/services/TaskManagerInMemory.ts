import { TodoDto } from "../../domain/dto/TodoDto";
import { ITodoConsoleRepositorie } from "../../domain/repositories/ITodoConsoleRepositorie";

export class TaskManagerInMemory implements ITodoConsoleRepositorie<TodoDto> {

  private taskList: TodoDto[] = []

  create(task: TodoDto): boolean {
    this.taskList.push(task);
    return true;
  }

  read(): TodoDto[] {
    // console.clear();
    return this.taskList;
  }

  update(id: number, task: TodoDto): boolean {
    this.taskList.splice(id, 1, task);
    return true;
  }

  delete(id: number): boolean {
    this.taskList.splice(id, 1);
    return true;
  }
}
