import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HomeOutlined, FormOutlined, KeyOutlined, InboxOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Homepage from './Homepage';
import LoginForm from './components/LoginForm';
import HouseFilterPage from './HouseFilterPage';
import HouseAddPage from './HouseAddPage';
import HouseResults from './HouseResults';
import SavedHouses from './components/SavedHouses';
import Logout from './components/Logout';
import Logo from './assets/zey.png';

const { Header, Content, Footer } = Layout;

const menuItems = [
  {
    key: '1',
    icon: <HomeOutlined />,
    label: <Link to="/homepage">Ana Sayfa</Link>,
  },
  {
    key: '2',
    icon: <FormOutlined />,
    label: <Link to="/house-add">Ev Ekleme</Link>,
  },
  {
    key: '3',
    icon: <KeyOutlined />,
    label: <Link to="/house-filter">Ev Filtreleme</Link>,
  },
  {
    key: '4',
    icon: <InboxOutlined />,
    label: <Link to="/saved-houses">Kayıtlı Evler</Link>,
  },
];

function App() {
  return (
    <Router>
      <Layout className="layout">
        <div className="header">
          <div className="Logo">
            <img src={Logo} alt="Logo" style={{ width: '250px', height: '230px' }} />
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="menu" items={menuItems} />
          <div className="logout-container">
            <Link to="/logout" className="menu-link">
              <PoweroffOutlined />
              Çıkış Yap
            </Link>
          </div>
        </div>

        <Content style={{ padding: '0 50px' }}> 
          <div className="site-layout-content">
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/house-filter" element={<HouseFilterPage />} />
              <Route path="/house-add" element={<HouseAddPage />} />
              <Route path="/results" element={<HouseResults />} />
              <Route path="/saved-houses" element={<SavedHouses />} />
              <Route path="/logout" element={<Logout />} />
              <Route
                path="/"
                element={
                  <div>
                    <h1>ZEYHEL EMLAK</h1>
                    <LoginForm />
                  </div>
                }
              />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Emlak Sistemi ©2024</Footer>
      </Layout>
    </Router>
  );
}

export default App;
