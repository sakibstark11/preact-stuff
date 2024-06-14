import httpErrorMap from "../../utils/httpErrorMap";

export default function todo(getAbortSignal?: AbortSignal) {
    const HOST_URL = "https://jsonplaceholder.typicode.com/todos";
    const getTodoById = async (id: string): Promise<Todo> => {
        const request = await fetch(`${HOST_URL}/${id}`, {
            signal: getAbortSignal,
        });
        if (request.status !== 200) {
            throw Error(httpErrorMap[request.status]);
        }
        return request.json();
    };

    return { getTodoById };
}
