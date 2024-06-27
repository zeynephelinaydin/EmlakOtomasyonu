import React, { useState } from 'react';
import { Card, Modal, Input, Button, message } from 'antd';
import FilterComponent from './components/FilterComponent';
import HouseList from './components/HouseList'; 

const HouseFilterPage = () => {
  const [filters, setFilters] = useState({});
  const [mailSent, setMailSent] = useState(false);
  const [mailModalVisible, setMailModalVisible] = useState(false);
  const [mailAddress, setMailAddress] = useState('');
  const [buttonKey, setButtonKey] = useState(0);

  const handleApplyFilters = (selectedFilters) => {
    setFilters(selectedFilters);
    setMailSent(false); // Filtreleme sonrasında mail gönderildi durumunu sıfırla
    setButtonKey((prevKey) => prevKey + 1);
  };

  const handleSendMail = () => {
    setMailModalVisible(true);
  };

  const handleOk = () => {
    if (mailAddress.trim() === '') {
      message.error('Lütfen geçerli bir mail adresi girin');
      return;
    }
    setMailSent(true);
    message.success('Mail gönderildi!');
    setMailModalVisible(false);
  };

  const handleCancel = () => {
    setMailModalVisible(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>İstediğiniz Evin Özelliklerini Giriniz</h1>
      <FilterComponent onApplyFilters={handleApplyFilters} />
      <Card style={styles.card}>
        <HouseList filters={filters} />
      </Card>
      <div style={styles.buttonContainer} key={buttonKey}>
        {!mailSent ? (
          <Button style={styles.button} onClick={handleSendMail}>
            Mail Gönder
          </Button>
        ) : (
          <p style={styles.successMessage}>Mail gönderildi!</p>
        )}
      </div>
      <Modal
        title="Mail Gönder"
        visible={mailModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Evet"
        cancelText="Hayır"
      >
        <Input
          placeholder="Mail adresinizi girin"
          value={mailAddress}
          onChange={(e) => setMailAddress(e.target.value)}
          onPressEnter={handleOk}
        />
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  card: {
    margin: '20px 0',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  successMessage: {
    color: 'green',
    fontStyle: 'italic',
  },
};

export default HouseFilterPage;
