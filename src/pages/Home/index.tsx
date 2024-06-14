import { useEffect } from "preact/hooks";
import Loader from "../../components/Loader/index";
import Search from "../../components/Search";
import useAbortController from "../../hooks/useAbortController";
import todoRepo from "../../repos/todo";
import useFetchData from "../../hooks/useFetchData";
import TodoDisplay from "../../components/TodoDisplay";

export default function Home() {
    const getAbortSignal = useAbortController();
    const { getTodoById } = todoRepo(getAbortSignal);

    const [executeFunction, loading, data, error] = useFetchData((id) =>
        getTodoById(id)
    );

    const handleSearch = (id: string) => {
        executeFunction(id);
    };

    useEffect(() => {
        executeFunction("5");
    }, [executeFunction]);

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
