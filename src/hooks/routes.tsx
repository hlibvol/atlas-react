import { AuthPage } from "pages/auth";
import { Editor } from "components/Editor";
import { UserEnd } from "pages/userEnd";
import { MatrixTableEdit } from "components/UseCaseMatrix/MatrixTableEdit";
import { MatrixTableView } from "components/UseCaseMatrix/MatrixTableView";
import { Resource } from "services/enums";
import { UserEndCourseDetails } from "pages/userEnd/details/courseDetails";
import { LearningModules } from "pages/userEnd/learningModules";

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
      path: "/learning",
      element: <UserEnd />,
    },
    {
      path: "/learning/course/:itemId",
      element: <UserEndCourseDetails />,
    },
    {
      path: "/learning/course/:courseId/learn-course/:itemId",
      element: <LearningModules />,
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
