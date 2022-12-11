import { useNavigation } from "@pankod/refine-core";
import { UrlField, Popover, Tag, TagField } from "@pankod/refine-antd";
import { IBaseResource } from "interfaces";

type ABPopOverListProps = {
  resource: string;
  records: IBaseResource[];
  title: string;
};

export const ABPopOverList: React.FC<ABPopOverListProps> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { resource, records = [], title = "" } = props;
  const { showUrl } = useNavigation();

  const content = records.length ? (
    records.map((item: IBaseResource) => (
      <Tag style={{ display: "flex", marginBottom: "6px" }} color='blue'>
        <UrlField value={showUrl(resource, item.id)} target='_blank'>
          {item.name}
        </UrlField>
      </Tag>
    ))
  ) : (
    <p>No records</p>
  );

  return (
    <Popover content={content} title={title} trigger='hover'>
      <TagField value={records.length} color='blue' />
    </Popover>
  );
};
