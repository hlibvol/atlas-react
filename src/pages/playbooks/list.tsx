import { useTranslate, IResourceComponentsProps, useNavigation } from "@pankod/refine-core";
import { List, Table, UrlField, Tag } from "@pankod/refine-antd";
import { useTableProps, useTableActionProps } from "hooks/table";
import { Resource } from "services/enums";
import { IPlayBook, IRole } from "interfaces";

export const PlayBookList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const tableProps = useTableProps({ resource: Resource.PLAYBOOK });
  const tableActionProps = useTableActionProps();
  const { editUrl } = useNavigation();
  return (
    <List breadcrumb={false}>
      <Table {...tableProps}>
        <Table.Column dataIndex='name' title={t("playbooks.fields.title")} />
        <Table.Column
          dataIndex={"roles"}
          title={t("playbooks.fields.process-role")}
          render={(roles) =>
            roles.map((item: IRole) => (
              <Tag key={item.id} color='blue'>
                <UrlField value={editUrl(Resource.ROLE, item.id)}>{item.name}</UrlField>
              </Tag>
            ))
          }
        />
        <Table.Column<IPlayBook> {...tableActionProps} />
      </Table>
    </List>
  );
};
