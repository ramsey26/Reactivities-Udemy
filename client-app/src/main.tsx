import ReactDOM from "react-dom";
import "./app/layout/styles.css";
import { StoreContext, store } from "./app/stores/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Routes";

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>,
  document.getElementById("root")
);
