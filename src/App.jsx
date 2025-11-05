import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CCL from "./Pages/CCLContacts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CCL />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
