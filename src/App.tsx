import { CssBaseline } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Films from "./pages/Films";

const router = createBrowserRouter([
  { path: "/", element: <Films /> },
]);

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
