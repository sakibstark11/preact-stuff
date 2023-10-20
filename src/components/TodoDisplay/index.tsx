import React from "react";

type Props = {
    todo: Todo;
};

export default function TodoDisplay({ todo }: Props) {
    return (
        <>
            <h1>{todo.title}</h1>
            <h2>{todo.id}</h2>
        </>
    );
}
