import { ICrudBase } from "../contracts/ICrudBase";
import { TodoDto } from "../dto/TodoDto";

export interface ITodoConsoleRepositorie<T> extends ICrudBase<TodoDto> { }
