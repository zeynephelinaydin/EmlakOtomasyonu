import React, { useState } from 'react';
import { Form, Input, Button, Select, Upload, message, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './HouseAddPage.css';

const { Option } = Select;

const HouseAddPage = () => {
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);

    const onFinish = (values) => { //ev eklemede çalışır
        const newHouse = { ...values, photo: file ? URL.createObjectURL(file) : null };
        const savedHouses = JSON.parse(localStorage.getItem('houses')) || [];
        savedHouses.push(newHouse);
        localStorage.setItem('houses', JSON.stringify(savedHouses));
        message.success('Ev başarıyla eklendi');
        form.resetFields();
        setFile(null);
    };

    const handleChange = (info) => { //file durumunu günceller dosya yükleme ve kaldırmada
        if (info.file.status === 'done') {
            setFile(info.file.originFileObj);
        } else if (info.file.status === 'removed') {
            setFile(null);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Card
                title="Ev Bilgilerini Giriniz"
                style={{ width: '100%', maxWidth: '600px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            >
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item
                        name="description"
                        label="Açıklama"
                        rules={[{ required: true, message: 'Açıklama gerekli!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Fiyat"
                        rules={[
                            { required: true, message: 'Fiyat gerekli!' },
                            { pattern: /^[0-9]{1,11}$/, message: 'Sadece sayı girilebilir!' },
                        ]}
                    >
                        <Input addonAfter="₺" />
                    </Form.Item>
                    <Form.Item
                        name="city"
                        label="İlçe"
                        rules={[{ required: true, message: 'İlçe gerekli!' }]}
                    >
                        <Select>
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
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Durum"
                        rules={[{ required: true, message: 'Durum gerekli!' }]}
                    >
                        <Select>
                            <Option value="Satılık">Satılık</Option>
                            <Option value="Kiralık">Kiralık</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="roomCount"
                        label="Oda Sayısı"
                        rules={[{ required: true, message: 'Oda sayısı gerekli!' }]}
                    >
                        <Select>
                            <Option value="1+1">1+1</Option>
                            <Option value="2+1">2+1</Option>
                            <Option value="3+1">3+1</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="furnitureStatus"
                        label="Eşya Durumu"
                        rules={[{ required: true, message: 'Eşya durumu gerekli!' }]}
                    >
                        <Select>
                            <Option value="Eşyalı">Eşyalı</Option>
                            <Option value="Eşyasız">Eşyasız</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Fotoğraf"
                        name="photo"
                    >
                        <Upload
                            listType="picture"
                            maxCount={1}
                            onChange={handleChange}
                            beforeUpload={() => false}
                        >
                            <Button icon={<UploadOutlined />}>Fotoğraf Ekle</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Ekle</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default HouseAddPage;
