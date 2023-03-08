import { Components } from "../../core/utils/Components";
import { IWebApplication } from "../../domain/contracts/IWebApplications";
import { Events } from "../../core/utils/Events";
import { TaskManagerInMemory } from "../../core/services/TaskManagerInMemory";
import { TodoDto } from "../../domain/dto/TodoDto";
// let acumulador: number = 0;
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';

export class MyWebApplication implements IWebApplication {

  private component: Components;
  private e: Events;
  private task: TaskManagerInMemory;

  constructor(components: Components, event: Events, task: TaskManagerInMemory) {
    this.component = components;
    this.e = event;
    this.task = task;
  }

  // start(): void {
  //   setTimeout(() => this.component.setViewComponent('.aside-header', 'header'), 100);
  // }

  start(): void {
    this.setHeaderComponent();
    this.setModalComponent();
    setTimeout(() => this.showModal(), 200);
    // setTimeout(() => this.isChecked(), 500);
    setTimeout(() => this.select(), 500);
  }

  setHeaderComponent(): void {
    setTimeout(() => this.component.setViewComponent('.aside-header', 'header'), 100);
  }

  setModalComponent(): void {
    setTimeout(() => this.component.setViewComponent('.modal', 'modal'), 100);
  }

  // setFooterComponent(): void {
  //   setTimeout(() => {
  //     this.component.setViewComponent('#myFooter', 'footer')
  //   }, 100);
  // }

  showModal(): void {
    const modal: HTMLElement = document.querySelector('#modal');
    this.newTask();
    this.e.click('.open', () => {
      setTimeout(() => {
        modal.style.transform = 'translate(0)';
        this.closeModal();
        console.log(this.task.read().length, 'array');
      }, 100)
    })
  }

  closeModal(): void {
    const modal: HTMLElement = document.querySelector('#modal');
    const xmark: HTMLElement = document.querySelector('.open');
    this.e.click('#cancel', () => {
      setTimeout(() => {
        xmark.setAttribute('href', '#');
        modal.style.transform = 'translate(100%)';
      }, 100)
    });
    this.e.click('.modal__close', () => {
      setTimeout(() => {
        modal.style.transform = 'translate(100%)';
      }, 100)
    })
  }

  showTask(newTask: Array<TodoDto>, acumulador: number, realizado: boolean, eliminado: boolean): void {
    const lista: HTMLUListElement = document.querySelector('#lista');
    const counter: HTMLElement = document.querySelector('#counter');
    const taskList = this.task.read();
    const checkbox = document.querySelector('#checkbox') as HTMLInputElement;
    const done = realizado ? check : uncheck;
    const line = realizado ? lineThrough : '';
    // const Line = checkbox.checked ? lineThrough : '';

    if (eliminado) { return }

    const elemento = `
    <li class="checkbox">
      <!-- <input id="radio-checkbox__label__input" type ="checkbox" name="check"/> -->
      <i class="far ${done}" data-info="realizado" id="${acumulador - 1}"></i>
    <div>
        <section>
          <p class="text ${line}"><strong>${newTask[acumulador - 1].name}</strong></p>
          <p class="date"> ${newTask[acumulador - 1].createdAt.toLocaleDateString('es-MX', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
        </section>
        <section>
          <p class="description ${line}" > ${newTask[acumulador - 1].description}</p>
          <p class="priority" > <strong>${newTask[acumulador - 1].priority}</strong></p>
        </section>
    </div>
      <i class="fas fa-trash" data-info="eliminado" id="${acumulador - 1}"></i>
    </li>`
    lista.insertAdjacentHTML("beforeend", elemento);
    counter.innerText = `${newTask.length}`;
  }

  newTask(): void {
    const taskList = this.task.read();
    const modal: HTMLElement = document.querySelector('#modal');
    this.e.click('#btnAdd', () => {
      const nameTask: HTMLInputElement = document.querySelector('#nameTask');
      const descTask: HTMLTextAreaElement = document.querySelector('#descTask');
      const priority: HTMLFormElement = document.querySelector('#priority');
      let acumulador: number = 0;
      console.log(taskList.length, 'length');
      console.log('evento guardar')

      if (nameTask.value === '' && descTask.value === '') {
        console.warn('Caja Vacia');
        // alert('Llene los espacios');
      } else {
        this.task.create({ name: nameTask.value, description: descTask.value, createdAt: new Date(), priority: priority.value, });
        acumulador = acumulador + (taskList.length);
        console.log(acumulador, 'acumulador');
        setTimeout(() => {
          this.showTask(taskList, acumulador, false, false);
          modal.style.transform = 'translate(100%)';
        }, 200)
      }
      console.table(taskList);
      nameTask.value = '';
      descTask.value = '';
      // id++;
    })
    // document.addEventListener('keyup', event => {
    //   if (event.key == 'Enter') {
    //     const nameTask: HTMLInputElement = document.querySelector('#nameTask');
    //     const descTask: HTMLTextAreaElement = document.querySelector('#descTask');
    //     const priority: HTMLFormElement = document.querySelector('#priority');
    //     let acumulador: number = 0;

    //     if (nameTask.value === '' || descTask.value === '') {
    //       console.warn('Caja Vacia');
    //     } else {
    //       this.task.create({ name: nameTask.value, description: descTask.value, createdAt: new Date(), priority: priority.value });
    //       acumulador = acumulador + (taskList.length);
    //       console.log(acumulador, 'acumulador');
    //       setTimeout(() => {
    //         this.showTask(taskList, acumulador);
    //         modal.style.transform = 'translate(100%)';
    //       }, 500)
    //     }
    //     nameTask.value = '';
    //     descTask.value = '';
    //   }
    // })
  }

  doneTask(element: Element): void {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    element.parentNode.querySelector('.description').classList.toggle(lineThrough);
  }

  deletedTask(element: Element): void {
    element.parentNode.parentNode.removeChild(element.parentNode);
    this.task.delete(Number(element.id))
    // let demo = this.task.read().findIndex()
    // this.task.delete(this.task.read())
    console.table(this.task.read())
    this.updateId(element);
  }

  updateId(element: Element): void {
    // const lista = document.
    // if (Number(element.id) > this.task.read().findIndex()) {
    //   element.parentNode.querySelector('id').setAttribute("id", '(Number(element.id) - 1)')
    // }
    const lista = document.querySelectorAll('.fas')
    console.log(lista);
  }

  // isChecked(): void {
  //   const checkbox = document.querySelector('#checkbox') as HTMLInputElement | null;
  //   const demo = document.querySelector('.text');
  //   const lineThrough = 'line-through';

  //   // document.addEventListener('click', (event) => {
  //   //   console.log(checkbox.checked)
  //   //   demo.parentNode.querySelector('.text').classList.toggle(lineThrough)
  //   // })
  //   this.e.click('#checkbox', () => {
  //     console.log(checkbox.checked)
  //     demo.parentNode.querySelector('.text').classList.toggle(lineThrough)
  //     // demo.classList.toggle('line-through');
  //   })
  // }

  select(): void {
    const lista: HTMLElement = document.querySelector('#lista');
    lista.addEventListener('click', (event) => {
      const element = event.target as HTMLElement;
      let elementData = element.dataset.info;
      console.log(element)
      console.log(element.id)
      if (elementData === 'realizado') {
        this.doneTask(element)
      } else if (elementData === 'eliminado') {
        this.deletedTask(element)
      }
    })
  }
}


