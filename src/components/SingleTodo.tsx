import React, { useEffect, useRef, useState } from "react";
import { Todo } from "./model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

function SingleTodo({ todo, todos, setTodos, index }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const handleEdit = (id: number) => {
    if (!edit && !todo.isComplete) {
      setEdit(!edit);
    }
  };

  const handleEditTodo = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="todos__single"
          onSubmit={(e) => handleEditTodo(e, todo.id)}
        >
          {edit ? (
            <input
              value={editTodo}
              ref={inputRef}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
            />
          ) : todo.isComplete ? (
            <del className="todos__single--text">{todo.todo}</del>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>
            <span className="icon">
              <AiFillEdit onClick={() => handleEdit(todo.id)} />
            </span>
            <span className="icon">
              <AiFillDelete onClick={() => handleDelete(todo.id)} />
            </span>
            <span className="icon">
              <MdDone onClick={() => handleComplete(todo.id)} />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
}

export default SingleTodo;
