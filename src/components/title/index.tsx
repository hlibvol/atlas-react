import './style.less';
import { GlobeIcon } from 'components/icons/globe';

type TitleProps = {
  collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  return (
    <div className="logo">
      {collapsed ? (
        <GlobeIcon style={{ color: 'white' }} />
      ) : (
        <h3 className="logo-text">ATLAS-BEACON</h3>
      )}
    </div>
  );
};
