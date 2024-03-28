import { useReducer } from "react";

export interface Todo {
  id: number;
  todo: string;
  isComplete: boolean;
}

type Actions =
  | { type: "add"; payload: string }
  | { type: "remove"; payload: number }
  | { type: "complete"; payload: number };

const TodoReducer = (state: Todo[], action: Actions) => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: Date.now(), todo: action.payload, isComplete: false },
      ];
    case "remove":
      return state.filter((todo) => todo.id !== action.payload);
    case "complete":
      return state.map((todo) =>
        todo.id !== action.payload
          ? { ...todo, isComplete: !todo.isComplete }
          : todo
      );
    default:
      return state;
  }
};

const ReducerExample = () => {
  const [state, dispatch] = useReducer(TodoReducer, []);

  // return <div></div>;
};
