import React, { useState } from 'react'; //durum yönetimi
import { Form, Input, Button, message, Checkbox, Card, Modal } from 'antd';
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined, InstagramFilled, FacebookFilled, TwitterCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; //yönlendirme
import './LoginForm.css';

const LoginForm = () => {
  const [loginSuccess, setLoginSuccess] = useState(false); //Kullanıcının başarılı bir şekilde giriş yapıp yapmadığını izler.
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false); //Şifre sıfırlama modalının gösterilip gösterilmediğini izler.
  const navigate = useNavigate(); //Doğru girişten sonra kullanıcıyı başka bir sayfaya yönlendirme

  const handleLogin = (values) => { //doğruysa giriş yap
    if (values.username === 'zeyhel' && values.password === 'zeyhel') {
      setLoginSuccess(true);
      message.success('Giriş başarılı!');
      navigate('/homepage'); // Doğru girişten sonra yönlendirme
    } else {
      message.error('Kullanıcı adı veya şifre yanlış!');
    }
  };

  const handleResetPassword = () => { //şifre sıfırlama
    setShowResetPasswordModal(true);
  };

  const handleResetPasswordOk = () => {
    setShowResetPasswordModal(false);
    message.info('Şifre yenileme mailiniz gönderildi!');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card title="ZEYHEL EMLAK" style={{ width: 400, margin: '0 auto', marginRight: 20 }}>
        <Form onFinish={handleLogin}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Lütfen kullanıcı adınızı girin!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Kullanıcı Adı" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Şifre"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle> 
              <Checkbox>Beni Hatırla</Checkbox> 
            </Form.Item>
            <a style={{ float: 'right' }} onClick={handleResetPassword}>
              Şifremi Unuttum
            </a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
        {loginSuccess && <p style={{ color: 'green', textAlign: 'center' }}>Giriş başarılı!</p>}
      </Card>
      <Card style={{ width: 400, margin: '0 auto' }}>
        <img src="https://i.hizliresim.com/9mgnn1o.png" alt="Zeyhel Emlak" style={{ width: '100%' }} />
        <h3 style={{ textAlign: 'center' }}>ZEYHEL EMLAK</h3>
        <div className="icon-wrapper">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramFilled className="icon" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FacebookFilled className="icon" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <TwitterCircleFilled className="icon" />
          </a>
        </div>
      </Card>
      <Modal
        title="Şifre Yenileme"
        visible={showResetPasswordModal}
        onOk={handleResetPasswordOk}
        onCancel={() => setShowResetPasswordModal(false)}
        okText="Evet"
        cancelText="Hayır"
      >
        <p>Şifre yenileme mailiniz gönderilsin mi?</p>
      </Modal>
    </div>
  );
};

export default LoginForm;
