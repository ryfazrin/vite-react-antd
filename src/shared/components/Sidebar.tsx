import { HomeOutlined, TeamOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

// const items: MenuProps['items'] = [
//   HomeOutlined,
//   UserOutlined,
//   TeamOutlined,
// ].map((icon, index) => ({
//   key: String(index + 1),
//   icon: React.createElement(icon),
//   label: <Link to={'/about'}>nav {index + 1}</Link>,
// }));

const items: MenuProps['items'] = [
  {
    key: 1,
    icon: <HomeOutlined />,
    label: <Link to={'/dashboard'}>Dashboard</Link>,
  },
  {
    key: 2,
    icon: <TeamOutlined />,
    label: <Link to={'/users'}>Users</Link>,
  },
] 

function Sidebar() {
  return (
    <Sider
      style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
    >
      <div className="demo-logo-vertical" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
    </Sider>
  );
}

export default Sidebar;