import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/auth/authStore.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login, Home, Signup, Account, Notes, ArchivedNotes, TrashedNotes } from "./pages";
import { Protected } from "./components/index.js";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/archived-notes",
        element: <ArchivedNotes />,
      },
      {
        path: "/trashed-notes",
        element: <TrashedNotes />,
      },
      {
        path: "/label/:labelId",
        element: <Notes />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
