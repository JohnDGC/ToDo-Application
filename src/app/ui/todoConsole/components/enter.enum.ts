import scanf from "scanf";
import { ConsoleMenu } from "./menu.enum";

export const enter = (): void => {
  console.log('\n[Enter]');
  const op = scanf('%s');
  console.clear();
  // console.log(Object.values(ConsoleMenu));
  Object.values(ConsoleMenu).forEach(option => console.log(option));
  // ConsoleMenu;
  console.log('\nChoose an option:')
}
