import React from 'react'; //filtereleme bileşeni(component)
import { Button, Form, Select } from 'antd';

const { Option } = Select; //select bileşeninin alt bileşeni ant design

const FilterComponent = ({ onApplyFilters }) => { //fonksiyon bileşeni onApplyFilters probu filtrelerin uygulanması için 
  const [form] = Form.useForm(); // ant Design formunu kontrol etmek için kullanılan bir hook

  const onFinish = (values) => {   // Form gönderildiğinde çağrılan fonksiyon formdan gelen değerleri selectedFilters nesnesine dönüştürür
    const selectedFilters = Object.keys(values).reduce((acc, key) => { //object form anahtarlarını alır reduce değeri saklar
      acc[key] = {
        value: values[key] || [],
      };
      return acc;
    }, {});
    onApplyFilters(selectedFilters); //filteryi çağırır
  };

  return ( //mode çoklu seçim özelliği  
    <Form form={form} onFinish={onFinish}>  
      <Form.Item name="ilceler" label="İlçe">
        <Select mode="multiple" placeholder="İlçe seçin">   
          {['Menteşe', 'Bodrum', 'Dalaman', 'Datça', 'Fethiye', 'Kavaklıdere', 'Köyceğiz', 'Marmaris', 'Milas', 'Ortaca', 'Seydikemer', 'Ula', 'Yatağan'].map(ilce => (
            <Option key={ilce} value={ilce}>{ilce}</Option>  // seçenekler oluşur
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="durum" label="Durum">
        <Select mode="multiple" placeholder="Durum seçin">
          {['Satılık', 'Kiralık'].map(durum => (
            <Option key={durum} value={durum}>{durum}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="odasayisi" label="Oda Sayısı">
        <Select mode="multiple" placeholder="Oda sayısı seçin">
          {['1+1', '2+1', '3+1'].map(odasayisi => (
            <Option key={odasayisi} value={odasayisi}>{odasayisi}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="cephe" label="Cephe">
        <Select mode="multiple" placeholder="Cephe seçin">
          {['Kuzey', 'Güney', 'Doğu', 'Batı'].map(cephe => (
            <Option key={cephe} value={cephe}>{cephe}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="esyadurumu" label="Eşya Durumu">
        <Select mode="multiple" placeholder="Eşya durumu seçin">
          {['Eşyalı', 'Eşyasız'].map(esyadurumu => (
            <Option key={esyadurumu} value={esyadurumu}>{esyadurumu}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">  
          Filtrele
        </Button>
      </Form.Item>
    </Form>
  );
}; //filtrele butonu

export default FilterComponent;
