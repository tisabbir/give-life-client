import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Root</div>,
      children: [
        {
          path: "contacts/:contactId",
          element: <div>Child ROutes</div>,
        },
      ],
    },
  ]);

  export default router;