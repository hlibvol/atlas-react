import { useState, useEffect } from "react";
import { useGetLocale, useSetLocale, useGetIdentity, useTranslate, useList } from "@refinedev/core";

import {
  Layout,
  Menu,
  Dropdown,
  Input,
  Avatar,
  Typography,
  Space,
  Grid,
  Row,
  Col,
  AutoComplete,
  Button,
} from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
import debounce from "lodash/debounce";

const { Text } = Typography;
const { useBreakpoint } = Grid;

import { IRole, IUser, IJob } from "interfaces";
import "./style.less";

interface IOptionGroup {
  value: string;
  label: string | React.ReactNode;
}

interface IOptions {
  label: string | React.ReactNode;
  options: IOptionGroup[];
}

export const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();
  const { data: user } = useGetIdentity<IUser>();
  const screens = useBreakpoint();
  const t = useTranslate();

  const currentLocale = locale();

  const renderTitle = (title: string) => (
    <div className='header-title'>
      <Text style={{ fontSize: "16px" }}>{title}</Text>
      <Link to={`/${title.toLowerCase()}`}>{t("search.more")}</Link>
    </div>
  );

  const renderItem = (title: string, imageUrl: string) => ({
    value: title,
    label: (
      <Link to='#' style={{ display: "flex", alignItems: "center" }}>
        <Avatar size={64} src={imageUrl} style={{ minWidth: "64px" }} />
        <Text style={{ marginLeft: "16px" }}>{title}</Text>
      </Link>
    ),
  });

  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<IOptions[]>([]);

  const { refetch: refetchUsers } = useList<IUser>({
    resource: "users",
    config: {
      filters: [{ field: "q", operator: "contains", value }],
    },
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        const orderOptionGroup = data.data.map((item) =>
          renderItem(`${item.first_name}`, "/images/user-default-img.png")
        );
        if (orderOptionGroup.length > 0) {
          setOptions((prevOptions) => [
            ...prevOptions,
            {
              label: renderTitle(t("users.users")),
              options: orderOptionGroup,
            },
          ]);
        }
      },
    },
  });

  const { refetch: refetchRoles } = useList<IRole>({
    resource: "roles",
    config: {
      filters: [{ field: "q", operator: "contains", value }],
    },
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        const storeOptionGroup = data.data.map((item) =>
          renderItem(item.name, "/images/default-store-img.png")
        );
        if (storeOptionGroup.length > 0) {
          setOptions((prevOptions) => [
            ...prevOptions,
            {
              label: renderTitle(t("roles.roles")),
              options: storeOptionGroup,
            },
          ]);
        }
      },
    },
  });

  const { refetch: refetchJobs } = useList<IJob>({
    resource: "jobs",
    config: {
      filters: [{ field: "q", operator: "contains", value }],
    },
  });

  useEffect(() => {
    setOptions([]);
    refetchUsers();
    refetchJobs();
    refetchRoles();
  }, [value]);

  const menu = (
    <Menu selectedKeys={currentLocale ? [currentLocale] : []}>
      {[...(i18n.languages ?? [])].sort().map((lang: string) => (
        <Menu.Item
          key={lang}
          onClick={() => changeLanguage(lang)}
          icon={
            <span style={{ marginRight: 8 }}>
              <Avatar size={16} src={`/images/flags/${lang}.svg`} />
            </span>
          }
        >
          {lang === "en" ? "English" : "German"}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Layout.Header
      style={{
        padding: "0px 24px",
        height: "64px",
        backgroundColor: "#FFF",
      }}
    >
      <Row align='middle' justify={screens.sm ? "space-between" : "end"}>
        <Col xs={0} sm={12}>
          <AutoComplete
            popupClassName='header-search'
            style={{ width: "100%", maxWidth: "550px" }}
            options={options}
            filterOption={false}
            onSearch={debounce((value: string) => setValue(value), 300)}
          >
            <Input
              size='large'
              placeholder={t("search.placeholder")}
              suffix={<SearchOutlined rev={undefined} />}
            />
          </AutoComplete>
        </Col>
        <Col>
          <Space size='middle'>
            <Dropdown overlay={menu}>
              <a style={{ color: "inherit" }} onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar size={16} src={`/images/flags/${currentLocale}.svg`} />
                  <div
                    style={{
                      display: screens.lg ? "block" : "none",
                    }}
                  >
                    {currentLocale === "en" ? "English" : "German"}
                    <DownOutlined
                      style={{
                        fontSize: "12px",
                        marginLeft: "6px",
                      }}
                      rev={undefined}
                    />
                  </div>
                </Space>
              </a>
            </Dropdown>
            <Text ellipsis strong>
              {user?.first_name}
            </Text>
            {/* @ts-ignore */}
            <Avatar size='large' src={user?.avatar} alt={user?.first_name} />
          </Space>
          <Space>
            <Button
              href='/learning'
              type='primary'
              size='small'
              target='_blank'
              style={{
                fontSize: "12px",
                marginLeft: "6px",
              }}
            >
              User End
            </Button>
          </Space>
        </Col>
      </Row>
    </Layout.Header>
  );
};
