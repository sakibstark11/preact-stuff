import { useEffect } from "preact/hooks";
import Loader from "../../components/Loader/index";
import Search from "../../components/Search";
import todoRepo from "../../repos/todo";
import useFetchData from "../../hooks/useFetchData";
import TodoDisplay from "../../components/TodoDisplay";

export default function Home() {
  const { getTodoById } = todoRepo();
  const dataFetch = (id: string, signal: AbortSignal) =>
    getTodoById(id, signal);

  const [executeFunction, loading, data, error] = useFetchData(dataFetch);

  const handleSearch = (id: string) => {
    executeFunction(id);
  };

  useEffect(() => {
    executeFunction("5");
  }, []);

  return (
    <>
      <Search onChange={handleSearch} />

      {loading && <Loader />}
      <br />
      {error && <h4>{error}</h4>}
      <br />
      {!loading && data && <TodoDisplay todo={data} />}
      <br />
    </>
  );
}
