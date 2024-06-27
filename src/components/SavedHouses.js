import React, { useState, useEffect } from 'react'; //kayıtlı ev düzenleme ,silme, görüntüleme
import { Button, Modal, message, Input, Select, Upload, Card, Row, Col, Empty } from 'antd';
import { UploadOutlined, SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const SavedHouses = () => {
    const [houses, setHouses] = useState([]); //houses,kayıtlı evlerin listesi
    const [editingHouse, setEditingHouse] = useState(null); //düzenlenen ev listesi
    const [editingIndex, setEditingIndex] = useState(null); //düzenlenen ev indexi
    const [file, setFile] = useState(null); //fotoğraf dosyası
    const [searchTerm, setSearchTerm] = useState(''); //arama kutusu

    useEffect(() => { //localstoragedan evleri alır
        const savedHouses = JSON.parse(localStorage.getItem('houses')) || [];
        setHouses(savedHouses);
    }, []);

    const onRemove = (index) => { //silme
        Modal.confirm({
            title: 'Evi Sil',
            content: 'Emin misiniz?',
            okText: 'Evet',
            okType: 'danger',
            cancelText: 'Hayır',
            onOk: () => {
                const updatedHouses = houses.filter((_, i) => i !== index);
                localStorage.setItem('houses', JSON.stringify(updatedHouses));
                setHouses(updatedHouses);
                message.success('Ev başarıyla silindi');
            },
        });
    };

    const onEdit = (index) => {
        setEditingHouse(houses[index]);
        setEditingIndex(index);
    };

    const handleEditSave = () => { //düzenlenen ev kaydetme
        const updatedHouses = [...houses];
        const updatedHouse = { ...editingHouse, photo: file ? URL.createObjectURL(file) : editingHouse.photo };
        updatedHouses[editingIndex] = updatedHouse;
        localStorage.setItem('houses', JSON.stringify(updatedHouses));
        setHouses(updatedHouses);
        setEditingHouse(null);
        setEditingIndex(null);
        setFile(null);
        message.success('Ev başarıyla güncellendi');
    };

    const handleUploadChange = ({ file }) => { //fotoğraf yükleme
        if (file.status === 'done') {
            setFile(file.originFileObj);
        } else if (file.status === 'removed') {
            setFile(null);
        }
    };

    const filteredHouses = houses.filter(house =>
        house.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        house.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
        house.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        house.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        house.roomCount.toLowerCase().includes(searchTerm.toLowerCase()) ||
        house.furnitureStatus.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Kayıtlı Evler</h2>
            <Input //arama
                placeholder="Ara"
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            <Row gutter={[16, 16]}>  
                {filteredHouses.length > 0 ? (
                    filteredHouses.map((house, index) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={index}>
                            <Card
                                title={house.city}
                                extra={<Button type="primary" onClick={() => onEdit(index)}>Güncelle</Button>}
                                actions={[
                                    <Button danger onClick={() => onRemove(index)}>Sil</Button>
                                ]}
                                cover={house.photo && <img src={house.photo} alt="Ev Fotoğrafı" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                            >
                                <p><strong>Açıklama:</strong> {house.description}</p>
                                <p><strong>Fiyat:</strong> {house.price}</p>
                                <p><strong>Durum:</strong> {house.status}</p>
                                <p><strong>Oda Sayısı:</strong> {house.roomCount}</p>
                                <p><strong>Eşya Durumu:</strong> {house.furnitureStatus}</p>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col span={24} style={{ textAlign: 'center' }}>
                        <Empty description="Aradığınız kriterlerde ev bulunamadı" />
                    </Col>
                )}
            </Row>
            {editingHouse && (
                <Modal
                    title="Güncelle"
                    visible={true}
                    onOk={handleEditSave}
                    onCancel={() => setEditingHouse(null)}
                >
                    <Input
                        value={editingHouse.description}
                        onChange={(e) => setEditingHouse({ ...editingHouse, description: e.target.value })}
                        placeholder="Açıklama"
                        style={{ marginBottom: '10px' }}
                    />
                    <Input
                        value={editingHouse.price}
                        onChange={(e) => setEditingHouse({ ...editingHouse, price: e.target.value })}
                        placeholder="Fiyat"
                        style={{ marginBottom: '10px' }}
                    />
                    <Select
                        value={editingHouse.city}
                        onChange={(value) => setEditingHouse({ ...editingHouse, city: value })}
                        placeholder="İlçe"
                        style={{ width: '100%', marginBottom: '10px' }}
                    >
                        <Option value="Menteşe">Menteşe</Option>
                        <Option value="Bodrum">Bodrum</Option>
                        <Option value="Dalaman">Dalaman</Option>
                        <Option value="Datça">Datça</Option>
                        <Option value="Fethiye">Fethiye</Option>
                        <Option value="Kavaklıdere">Kavaklıdere</Option>
                        <Option value="Köyceğiz">Köyceğiz</Option>
                        <Option value="Marmaris">Marmaris</Option>
                        <Option value="Milas">Milas</Option>
                        <Option value="Ortaca">Ortaca</Option>
                        <Option value="Seydikemer">Seydikemer</Option>
                        <Option value="Ula">Ula</Option>
                        <Option value="Yatağan">Yatağan</Option>
                    </Select>
                    <Select
                        value={editingHouse.status}
                        onChange={(value) => setEditingHouse({ ...editingHouse, status: value })}
                        placeholder="Durum"
                        style={{ width: '100%', marginBottom: '10px' }}
                    >
                        <Option value="Satılık">Satılık</Option>
                        <Option value="Kiralık">Kiralık</Option>
                    </Select>
                    <Select
                        value={editingHouse.roomCount}
                        onChange={(value) => setEditingHouse({ ...editingHouse, roomCount: value })}
                        placeholder="Oda Sayısı"
                        style={{ width: '100%', marginBottom: '10px' }}
                    >
                        <Option value="1+1">1+1</Option>
                        <Option value="2+1">2+1</Option>
                        <Option value="3+1">3+1</Option>
                    </Select>
                    <Select
                        value={editingHouse.furnitureStatus}
                        onChange={(value) => setEditingHouse({ ...editingHouse, furnitureStatus: value })}
                        placeholder="Eşya Durumu"
                        style={{ width: '100%', marginBottom: '10px' }}
                    >
                        <Option value="Eşyalı">Eşyalı</Option>
                        <Option value="Eşyasız">Eşyasız</Option>
                    </Select>
                    <Upload
                        listType="picture"
                        maxCount={1}
                        onChange={handleUploadChange}
                        beforeUpload={() => false}
                        style={{ marginBottom: '10px' }}
                    >
                        <Button icon={<UploadOutlined />}>Fotoğraf Ekle</Button>
                    </Upload>
                </Modal>
            )}
        </div>
    );
};

export default SavedHouses;
