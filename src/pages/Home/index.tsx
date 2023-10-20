import { useCallback, useEffect } from "preact/hooks";
import Loader from "../../components/Loader/index";
import Search from "../../components/Search";
import useAbortController from "../../hooks/useAbortController";
import todoRepo from "../../repos/todo";
import useFetchData from "../../hooks/useFetchData";
import TodoDisplay from "../../components/TodoDisplay";

export default function Home() {
    const getAbortSignal = useAbortController();
    const { getTodoById } = todoRepo(getAbortSignal);

    const { loading, error, data, executeFunction } = useFetchData(
        (id: string) => getTodoById(id)
    );

    useEffect(() => {
        executeFunction("1");
    }, [executeFunction]);

    return (
        <>
            <Search
                onChange={(id: string) => {
                    executeFunction(id);
                }}
            />

            {loading && <Loader />}
            <br />
            {error && <h4>{error}</h4>}
            <br />
            {!loading && data && <TodoDisplay todo={data} />}
            <br />
        </>
    );
}
