import { RoutePath } from "./enums";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import TodoPage from "./pages/todos/TodoPage";
import { Register } from "./components/Register";

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TODO App</h1>
      <Routes>
        <Route path={RoutePath.Register} Component={Register} />
        <Route path={RoutePath.Login} Component={Login} />
        <Route index path={RoutePath.Todos} Component={TodoPage} />
      </Routes>
    </div>
  );
}

export default App;
