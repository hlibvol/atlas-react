import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "@pankod/refine-react-router-v6";

export const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <h5 style={{ padding: 24 }}>
      <LeftOutlined />
      <span style={{ marginLeft: "5px", cursor: "pointer", fontWeight: 700 }} onClick={goBack}>
        Back To Learning
      </span>
    </h5>
  );
};
