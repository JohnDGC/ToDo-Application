export interface ICrudBase<T> {
  create(task: T): boolean
  read(): T[]
  update(id: number, task: T): boolean
  delete(id: number): boolean
}
