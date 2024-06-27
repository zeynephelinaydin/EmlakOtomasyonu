import React, { useState } from 'react';
import { Modal, Button, message, Card } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { confirm } = Modal;

const Logout = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Oturum bilgilerini temizleme işlemleri
    localStorage.removeItem('token'); // Örnek olarak token'i siliyoruz

    // Çıkış yapıldıktan sonra login sayfasına yönlendirme
    navigate('/login');

    // Çıkış başarılı mesajı gösterme
    message.success('Çıkış başarıyla yapıldı.');

    setIsModalVisible(false); // Modal penceresini kapat
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Modal penceresini kapat
  };

  return (
    <Card style={{ width: 300, margin: 'auto', marginTop: 20, padding: 20, textAlign: 'center' }}>
      <h2 style={{ color: '#1890ff' }}>Tercih ettiğiniz için teşekkür ederiz.</h2>
      
      <img src="https://i.hizliresim.com/9mgnn1o.png" alt="Resim" style={{ width: '100%', marginBottom: 20 }} />
      <Button type="primary" style={{ backgroundColor: 'white', color: '#1890ff', borderColor: '#1890ff' }} onClick={showModal}>
        Çıkış Yap
      </Button>
      <Modal
        title="Çıkış Yapmak İstediğinize Emin Misiniz?"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Evet"
        cancelText="Hayır"
        maskClosable={false} // Modal dışına tıklanarak kapatılmasını engelle
      >
        
      </Modal>
    </Card>
  );
};

export default Logout;
