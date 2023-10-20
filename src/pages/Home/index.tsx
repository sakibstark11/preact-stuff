import { useState } from "preact/hooks";
import Loader from "../../components/Loader/index";
import Search from "../../components/Search";
import useAbortController from "../../hooks/useAbortController";
import todoRepo from "../../repos/todo";

export default function Home() {
  const [todo, setTodo] = useState<Todo>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const getAbortSignal = useAbortController();
  const { getTodoById } = todoRepo(getAbortSignal);

  const fetchTodo = (id: string) => {
    setLoading(true);
    getTodoById(id)
      .then((data) => {
        setTodo(data);
        setError(null);
        setLoading(false);
      })
      .catch((err: Error) => {
        setTodo(null);
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <Loader />}
      <br />
      {error && <h4>{error}</h4>}
      <br />
      {!loading && todo && (
        <>
          <h1>{todo.title}</h1>
          <h2>{todo.id}</h2>
        </>
      )}
      <br />
      <Search onChange={fetchTodo} />
    </>
  );
}
