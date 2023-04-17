import { AuthPage } from "pages/auth";
import { Editor } from "components/Editor";
import { MatrixTableEdit } from "components/UseCaseMatrix/MatrixTableEdit";
import { MatrixTableView } from "components/UseCaseMatrix/MatrixTableView";
import { Resource } from "services/enums";

export const useRoutes = () => {
  return [
    {
      path: "/forgot-password",
      element: <AuthPage type='forgotPassword' />,
    },
    {
      path: "/update-password",
      element: <AuthPage type='updatePassword' />,
    },
    {
      path: "/editor/:resource/:itemId",
      element: <Editor />,
    },
    {
      path: `/${Resource.USE_CASE}/:itemId`,
      element: <MatrixTableEdit />,
      layout: true,
    },
    {
      path: `/${Resource.USE_CASE}-view/:itemId`,
      element: <MatrixTableView />,
    },
  ];
};
