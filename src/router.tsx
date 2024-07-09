import {
  createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import Users from "./pages/users";
import Dashboard from "./pages/dashboard";

const router: any = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      }
    ]
  },
]);

export default router;