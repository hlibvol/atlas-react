import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "@pankod/refine-react-router-v6";

interface IBtnProps {
  itemdetailslink: string;
  courseId: number | undefined;
}
export const BackButton: React.FC<IBtnProps> = (props) => {
  console.log("first", props.itemdetailslink);
  const navigate = useNavigate();
  const goBack = () => {
    if (props.itemdetailslink === "/learning") {
      navigate(props.itemdetailslink);
    } else {
      navigate(props.itemdetailslink);
    }
  };
  return (
    <h5 style={{ padding: 24 }}>
      <LeftOutlined />
      <span style={{ marginLeft: "5px", cursor: "pointer", fontWeight: 700 }} onClick={goBack}>
        Back To Learning
      </span>
    </h5>
  );
};
