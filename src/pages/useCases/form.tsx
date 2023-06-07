import React from "react";

import { IResourceComponentsProps } from "@refinedev/core";
import { DrawerForm } from "components/Resource/form";
import { Resource } from "services/enums";
import { useAppSelector } from "redux/hooks";
import { MatrixTableEdit } from "components/UseCaseMatrix/MatrixTableEdit";

export const UseCaseForm: React.FC<IResourceComponentsProps> = () => {
  const { itemId } = useAppSelector((state) => state.drawer);
  const resource = Resource.USE_CASE;
  const renderFields = () => {
    return [
      {
        tabKey: "2",
        field: itemId ? <MatrixTableEdit itemId={itemId} /> : <>No data available</>,
      },
    ];
  };

  return <DrawerForm resource={resource} renderFields={renderFields} />;
};
