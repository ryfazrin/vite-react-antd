import { Layout } from "antd";

const { Footer } = Layout;

function CustomFooter() {
  return (
    <Footer style={{ textAlign: 'center' }}>
      Code.id ©{new Date().getFullYear()} Created by Ryan Pazrin
    </Footer>
  );
}

export default CustomFooter;