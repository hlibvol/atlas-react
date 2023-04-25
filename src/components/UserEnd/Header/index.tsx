import { AntdLayout } from "@pankod/refine-antd";
import { Link } from "@pankod/refine-react-router-v6";
import "../styles.scss";

export const UserEndHeader: React.FC = () => {
  return (
    <AntdLayout.Header className='header'>
      <Link to='/learning' className='logo-link'>
        <h1 className='logo-color'>AB</h1>
      </Link>
    </AntdLayout.Header>
  );
};
