import { AuthPage as AntdAuthPage } from "@pankod/refine-antd";
import { useRouterContext } from "@pankod/refine-core";
import "./style.less";

const authWrapperProps = {
  style: {
    background:
      "radial-gradient(50% 50% at 50% 50%,rgba(255, 255, 255, 0) 0%,rgba(0, 0, 0, 0.5) 100%)",
    backgroundSize: "cover",
  },
};

const renderAuthContent = (content: React.ReactNode) => {
  const { Link } = useRouterContext();

  return (
    <div
      style={{
        maxWidth: 408,
        margin: "auto",
      }}
    >
      <Link to="/">
        <h3 className="login-title" style={{ marginBottom: 26 }}>
          ATLAS BEACON
        </h3>
      </Link>
      {content}
    </div>
  );
};

export const AuthPage: React.FC<{
  type?: "login" | "register" | "resetPassword" | "updatePassword";
}> = ({ type }) => {
  return (
    <AntdAuthPage
      type={type}
      wrapperProps={authWrapperProps}
      renderContent={renderAuthContent}
    />
  );
};
