import React from "react";
import { Todo } from "./model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

function TodoList({ todos, setTodos, completedTodos, setCompletedTodos }: Props) {
  return (
    <div className="container">
      <Droppable droppableId="TodosList1">
        {(prov) => (
          <div className="todos" ref={prov.innerRef} {...prov.droppableProps}>
            <span className="todos__heading">Active tasks</span>
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                key={todo.id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
            {prov.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(prov) => (
          <div
            className="todos remove"
            ref={prov.innerRef}
            {...prov.droppableProps}
          >
            <span className="todos__heading">Completed tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                key={todo.id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
            {prov.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TodoList;
