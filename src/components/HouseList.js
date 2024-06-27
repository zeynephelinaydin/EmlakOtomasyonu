import React, { useState, useEffect } from 'react'; // useState bileşen durumu yönetimi, useEffect yan etkileri yönetmek
import { List, Alert } from 'antd'; //listeleme ve uyarı
import axios from 'axios'; //api için htttp kütüphanesi

const HouseList = ({ filters }) => {
  const [houses, setHouses] = useState([]);   //ev listesini tutar
  const [loading, setLoading] = useState(true); //Verilerin yüklenip yüklenmediğini izler

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get('https://v1.nocodeapi.com/zeyhell/google_sheets/onvpQNTfjQQjmrUV?tabId=Sayfa1');
        const data = response.data.data;

        const filteredHouses = data.filter(house => { //data.filter kullanarak, filtrelere uyan evler seçilir ve filteredHouses'a atanır.
          return Object.keys(filters).every(filterName => {
            const { value } = filters[filterName];
            if (value.length === 0) return true;  // Filtre seçilmemişse tüm evler geçer
            return value.includes(house[filterName]);
          });
        });

        setHouses(filteredHouses);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, [filters]);

  return (
    <div>
      <h1>Aradığınız Evi Bulduk!</h1>
      {loading ? (
        <div>Loading...</div> //loading true ise gösterilen yazı
      ) : houses.length === 0 ? (
        <Alert message="Aradığınız kriterde ev bulunamadı" type="warning" />
      ) : (  //alert ile uyarı mesajı
        <List
          itemLayout="horizontal" //List bileşeni ile evler listelenir. Her ev için List.Item ve List.Item.Meta bileşenleri kullanılarak evin detayları gösterilir
          dataSource={houses}
          renderItem={house => (
            <List.Item>
              <List.Item.Meta
                title={`Fiyat ${house['ev:id']}`}
                description={`İlçe: ${house.ilceler || 'Bilinmiyor'}, Durum: ${house.durum || 'Bilinmiyor'}, Oda Sayısı: ${house.odasayisi || 'Bilinmiyor'}, Eşya Durumu: ${house.esyadurumu || 'Bilinmiyor'}, Cephe: ${house.cephe || 'Bilinmiyor'}`}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default HouseList;
