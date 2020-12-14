/** @format */
import React from 'react';
import ReactDom from 'react-dom';

const App = () => {
    return <div>Hello App</div>;
};

const render = () => {
    const root = document.getElementById("root")
    ReactDom.render(<App />, root);
};

render();
