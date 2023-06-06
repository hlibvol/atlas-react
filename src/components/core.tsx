import { IBaseResource } from "interfaces";
import { BaseRecord, useNavigation } from "@refinedev/core";
import { Tag, Divider } from "antd";
import { UrlField } from "@refinedev/antd";
import { useParams } from "react-router-dom";
import { Action, Resource } from "services/enums";
import { openDrawer } from "redux/slices/drawerSlice";
import { useAppDispatch } from "redux/hooks";

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

export const getResourceLink = (resource: Resource, record: BaseRecord) => {
  const dispatch = useAppDispatch();
  return (
    <Tag
      color='blue'
      onClick={() => {
        dispatch(
          openDrawer({
            resource: resource,
            action: Action.EDIT,
            itemId: record.id,
          })
        );
      }}
    >
      {record?.name ? record.name : ""}
    </Tag>
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
