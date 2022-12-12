import React from "react";
import { useTranslate } from "@pankod/refine-core";
import { Button } from "@pankod/refine-antd";

interface IUpdateLessonProps {
  itemId: any;
}

export const DesignerButton: React.FC<IUpdateLessonProps> = ({ itemId }) => {
  const t = useTranslate();

  return (
    <Button type='primary' size='small' style={{ width: "105px" }}>
      <a href={`../../lessons/show/${itemId}`}>{t("buttons.design")}</a>
    </Button>
  );
};
