import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { List, Alert } from 'antd'; //filtrelenmiş ev sonuçlarını listeler

const HouseResults = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const filters = {
      city: query.getAll('city').length ? query.getAll('city') : null,
      status: query.getAll('status').length ? query.getAll('status') : null,
      roomCount: query.getAll('roomCount').length ? query.getAll('roomCount') : null,
      furnitureStatus: query.getAll('furnitureStatus').length ? query.getAll('furnitureStatus') : null,
      facade: query.getAll('facade').length ? query.getAll('facade') : null,
    };
  
    axios({
      method: 'get',
      url: 'https://v1.nocodeapi.com/zeyhell/google_sheets/onvpQNTfjQQjmrUV?tabId=Sayfa1',
      params: filters,
    })
      .then(response => {
        const data = response.data;
        const filteredHouses = data.filter(house => {
          return (
            (!filters.city || filters.city.includes(house.ilceler)) &&
            (!filters.status || filters.status.some(selectedStatus => house.durum.includes(selectedStatus))) &&
            (!filters.roomCount || filters.roomCount.some(selectedRoomCount => house.odasayisi.includes(selectedRoomCount))) &&
            (!filters.furnitureStatus || filters.furnitureStatus.some(selectedFurnitureStatus => house.esyadurumu.includes(selectedFurnitureStatus))) &&
            (!filters.facade || filters.facade.some(selectedFacade => house.cephe.includes(selectedFacade)))
          );
        });
        setHouses(filteredHouses);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [location.search]);
  

  return (
    <div>
      <h1>Filtre Sonuçları</h1>
      {loading ? (
        <div>Loading...</div>
      ) : houses.length === 0 ? (
        <Alert message="Aradığınız kriterde ev bulunamadı" type="warning" />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={houses}
          renderItem={house => (
            <List.Item>
              <List.Item.Meta
                title={`Ev ${house.id}`}
                description={`İlçe: ${house.ilceler}, Durum: ${house.durum}, Oda Sayısı: ${house.odasayisi}, Eşya Durumu: ${house.esyadurumu}, Cephe: ${house.cephe}`}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default HouseResults;
