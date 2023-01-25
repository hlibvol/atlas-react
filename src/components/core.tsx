import { IBaseResource } from "interfaces";
import { useNavigation } from "@pankod/refine-core";
import { UrlField, Tag, Divider } from "@pankod/refine-antd";
import { useParams } from "react-router-dom";

export const TagList = ({
  resource,
  records = [],
}: {
  resource: string;
  records: IBaseResource[];
}) => {
  const { showUrl } = useNavigation();
  const { action } = useParams();
  return (
    <>
      {records.length
        ? records.map((item: IBaseResource) => (
            <Tag
              key={`popover-${resource}-${item.id}`}
              color='blue'
              style={action === "show" ? { marginBottom: "10px" } : {}}
            >
              <UrlField value={showUrl(resource, item.id)} target='_blank'>
                {item.name}
              </UrlField>
            </Tag>
          ))
        : null}
    </>
  );
};

export const ABDivider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Divider orientationMargin={0} orientation='left'>
      <div>{children}</div>
    </Divider>
  );
};

export const HTMLContent = ({ children }: { children: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: children }} style={{ marginBottom: "40px" }} />;
};
