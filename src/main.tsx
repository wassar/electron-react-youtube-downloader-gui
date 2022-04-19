import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import Store from "./store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={Store}>
        <App />
    </Provider>
);
