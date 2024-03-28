import React, { useRef, useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./components/model";
import TodoList from "./components/TodoList";
import { DragDropContext } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isComplete: false }]);
      setTodo("");
    }
  };
  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="App">
        <h1>Hello Type</h1>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          todos={todos}
          setTodos={setTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
