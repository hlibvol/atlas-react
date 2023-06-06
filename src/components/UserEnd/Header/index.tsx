import { Layout } from "antd";
import { Link } from "react-router-dom";

import "../styles.scss";

export const UserEndHeader: React.FC = () => {
  return (
    <Layout.Header className='header'>
      <Link to='/learning' className='logo-link'>
        <h1 className='logo-color'>AB</h1>
      </Link>
    </Layout.Header>
  );
};
