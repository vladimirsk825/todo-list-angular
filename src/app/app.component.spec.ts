import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoWrapperComponent } from "./todo-list/components/todo-wrapper/todo-wrapper.component";
import { TodoService } from "./todo-list/services/todo.service";
import { StateService } from "./todo-list/services/state.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ResponseTodo } from "./todo-list/interfaces/response";
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs';
import { AddTodoComponent } from "./todo-list/components/add-todo/add-todo.component";
import { Todo } from './todo-list/interfaces/todo';

const todoListResponse: ResponseTodo = {
  success: true,
  type: 'task_rows',
  data: [
    {
      id: 26,
      description: 'Nueva tarea',
      status: 1,
      id_author: 31,
      finish_at: '2022-06-24T00:00:00.000Z',
      created_at: '2022-06-14T12:06:38.000Z',
    },
    {
      id: 28,
      description: 'Nuevo Todo',
      status: 0,
      id_author: 31,
      finish_at: '2022-06-16T00:00:00.000Z',
      created_at: '2022-06-14T13:14:08.000Z',
    },
  ],
};

const todo: Todo = { 

      id: 26,
      description: 'Nueva tarea',
      status: 1,
      id_author: 31,
      finish_at: '2022-06-24T00:00:00.000Z',
      created_at: '2022-06-14T12:06:38.000Z',   

};

describe('TodoList App Test', () => {

  let todoWrapperComponent: TodoWrapperComponent;
  let fixture: ComponentFixture<TodoWrapperComponent>;
  
  let todoService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '', component: TodoWrapperComponent },
          { path: 'todo', component: AddTodoComponent }
        ]),
      ],
      declarations: [
        TodoWrapperComponent,
        AddTodoComponent
      ],
      providers: [
        TodoService,
        StateService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoWrapperComponent);
    todoWrapperComponent = fixture.componentInstance;
    fixture.detectChanges();
    todoService = fixture.debugElement.injector.get(TodoService);
    jest.spyOn(todoService, 'getTodoList').mockImplementation(() => of(todoListResponse));
  });

  afterEach(() => {
    fixture.destroy();
    jest.resetAllMocks();
  });

  it('should create TodoWrapperComponent', () => {
    expect(todoWrapperComponent).toBeTruthy();
  });

  it('Should create a new todo', async () => {
 
  })
  /**
   * test de los metodos dentro del todo wrapper
   */
   it('Obener toda la lista getListTodo', async () => {
    todoWrapperComponent.getListTodo();
    expect(todoWrapperComponent.getListTodo.length).toBe(0);
   })
   it('redireccionar para añadir addTodo', async () => {
    todoWrapperComponent.addTodo();
    expect(todoWrapperComponent.addTodo.length).toBe(0);
   })
   it('enviar elemantos para actualizar todo list', async () => {
    todoWrapperComponent.updateList(todo);
    expect(todoWrapperComponent.updateList.length).toBe(1);
   })
   it('enviar elemantos para elimanr todo list', async () => {
    todoWrapperComponent.eliminarTarea(1);
    expect(todoWrapperComponent.eliminarTarea.length).toBe(1);
   })
  /**
   * test de los metodos dentro servicio
   */
   it('create servicio', () => {
    expect(todoService).toBeTruthy();
   });

   it('obtener toda la lista', (done) => {
    todoService.getTodoList().subscribe(tareas=> {
      expect(tareas.success).toBe(true);
    })
    done();
   });

   it('crear nueva tarea por servicio', (done) => {
    todoService.createTodoList(todo).subscribe(tareas=> {
          expect(tareas.success).toBe(true);
        })        
        done();
   });

   it('actualuzar nueva tarea por servicio', (done) => {
    todoService.updateTodoList(todo).subscribe(tareas=> {
          expect(tareas.success).toBe(true);
        })        
        done();
   });

   it('eliminar nueva tarea por servicio', (done) => {
    todoService.deleteTodoList(100).subscribe(tareas=> {
          expect(tareas.success).toBe(false);
        })        
        done();
   });



  /**
  *
  * Probar que el formulario muestre los mensajes de requerimiento cuando
  * el formulario no tenga la descripción y la fecha ingresada
 */
  it('Should validate the todo form, description and date required', async () => {
  })
  it('Should update a todo, description and date', async () => {
  })
  it('Should delete a todo', async () => {
  })

  /**
  *
  * Probar que el formulario muestre los mensajes de requerimiento cuando
  * el formulario no tenga la descripción y la fecha ingresada
 */
  it('Should update the todo status ', async () => {
  })
  it('Should show an message when  the todo list is empty  ', async () => {
  })

  /**
  *
  * Probar que la barra de estado cambia cuando se completa una tarea
  * se puede probar por el cambio en texto o por porcentaje de completitud
 */
  it('Should the progress bar change its label text or percentage when a todo is completed ', async () => {
  })

  /**
   *
   * Probar el filtro de las tareas por descripcion
  */
 

  /**
   *
   * Probar el filtro de tareas que falta por completar y que una vez esten filtradas a dar click nuevamente
   * sobre el boton del filtro se muestren todos la lista nuevamente
  */
  it('Should filter the todo list by completed status and toggle functionality button', async () => {
  })

});