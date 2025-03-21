import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import {
  Home,
  Login,
  Teammate,
  Register,
  AddTeammate,
  EditTeammate,
} from "./pages"

import { RoutesEnum } from "./Routes"
import { ErrorMessage } from "./components/shared"
import { ThemeProvider } from "./components/shared/theme-provider"

const router = createBrowserRouter([
  {
    element: <Home />,
    path: RoutesEnum.HOME,
    errorElement: <ErrorMessage />,
  },
  {
    element: <Teammate />,
    path: `${RoutesEnum.TEAM}/:id`,
    errorElement: <ErrorMessage />,
  },
  {
    element: <Login />,
    path: RoutesEnum.LOGIN,
    errorElement: <ErrorMessage />,
  },
  {
    element: <Register />,
    path: RoutesEnum.REGISTER,
    errorElement: <ErrorMessage />,
  },

  {
    element: <AddTeammate />,
    path: RoutesEnum.ADD,
    errorElement: <ErrorMessage />,
  },

  {
    element: <EditTeammate />,
    path: `${RoutesEnum.EDIT}/:id`,
    errorElement: <ErrorMessage />,
  },
])
const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
