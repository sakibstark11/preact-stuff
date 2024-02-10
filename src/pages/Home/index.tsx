import { useState } from "preact/hooks";
import Loader from "../../components/Loader/index";
import Search from "../../components/Search";
import useAbortController from "../../hooks/useAbortController";
import todoRepo from "../../repos/todo";

export default function Home() {
    const [{ todo, loading, error }, setState] = useState({
        todo: null,
        loading: false,
        error: null,
    });
    const { signal } = useAbortController();
    const { getTodoById } = todoRepo(signal);

    const fetchTodo = (id: string) => {
        setState({ loading: true, todo: null, error: null });
        getTodoById(id)
            .then((data) => {
                setState({ loading: false, todo: data, error: null });
            })
            .catch((err: Error) => {
                setState({ loading: false, todo: null, error: error.message });
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
