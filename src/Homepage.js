import React from 'react';
import { Card, Divider } from 'antd';
import './Homepage.css';
import { EnvironmentTwoTone, PhoneTwoTone, MailTwoTone, InstagramFilled, FacebookFilled, TwitterCircleFilled } from '@ant-design/icons';

const { Meta } = Card;

const Homepage = () => {
  const handleCardClick = (url) => {
    window.location.href = url;
  };

  return (
    <div className="main-content">
      <Divider orientation="left">ZEYHEL EMLAK HAKKINDA</Divider>
      <Card title="Hakkımızda" className="card">
        <h1>Hayallerinizdeki Evi Bulmanın En Kolay Yolu ZEYHEL EMLAK!</h1>
        <p>Muğla'nın eşsiz doğası ve huzurlu yaşamıyla tanınan ilçelerinde, hayalinizdeki evi bulmanın artık çok daha kolay bir yolu var. Biz, ZEYHEL EMLAK olarak, size en uygun konutları sunmak için buradayız.</p>
        <h2>Muğla'nın Güzel İlçelerinde Ev Sahibi Olun</h2>
        <p>Bodrum'un eşsiz sahil kasabalarından, Fethiye'nin doğal güzelliklerine kadar, Muğla'nın tüm ilçelerinde geniş bir portföy sunuyoruz. Ev sahibi olma hayalinizi gerçeğe dönüştürmek için bize ulaşın, size en uygun seçenekleri birlikte değerlendirelim!</p>
        <img src="https://i.hizliresim.com/gpn9ru7.jpg" alt="Zeyhel Emlak" style={{ width: '100%', height: '600px' }} />
      </Card>

      <Divider orientation="left">ZEYHEL EMLAK BLOG</Divider>
      <Card title="Muğla'nın saklı cenneti: Akyaka" className="card">
        <p>Muğla'nın incisi Akyaka, kendine özgü mimarisi, masmavi denizi, yemyeşil doğası ve huzur veren ortamıyla ziyaretçilerine unutulmaz bir deneyim sunar. Buraya geldiğinizde, sizi ilk olarak Azmak Nehri karşılar. Berrak suyu ve su altındaki renkli bitki örtüsüyle adeta doğal bir akvaryum gibi olan Azmak Nehri, kano turları ve yüzme keyfi için ideal bir mekandır. Nehir boyunca sıralanan balık restoranlarında taze deniz ürünlerinin tadını çıkarabilir, suyun sakinleştirici sesinde huzur bulabilirsiniz. Akyaka, doğayla iç içe olmak ve şehir hayatının stresinden uzaklaşmak isteyenler için mükemmel bir kaçış noktası!</p>
        <img src="https://i.hizliresim.com/ih30zn0.jpg" alt="Blog" style={{ width: '100%' }} />
      </Card>

      <Divider orientation="left">Keşfet</Divider>
      <div className="houses">
        <Card
          hoverable
          className="house-card"
          cover={<img alt="Ev 1" src="https://i.hizliresim.com/siat2e6.png" />}
        >
          <Meta title="50.000.000 TL" description="Akyaka Muğla'da 1+1, denize 300m satılık villa" />
        </Card>
        <Card
          hoverable
          className="house-card"
          cover={<img alt="Ev 2" src="https://i.hizliresim.com/8eaury8.jpg" />}
         
        >
          <Meta title="400.000 TL" description="Bodrum Turgutreis'te deniz manzaralı, 3+1 kiralık lüks villa" />
        </Card>
        <Card
          hoverable
          className="house-card"
          cover={<img alt="Ev 3" src="https://i.hizliresim.com/snb0j02.png" />}
        
        >
          <Meta title="1.550.000 TL" description="Ortaca Dalyan'da 2+1, denize sıfır satılık bungalow ev" />
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: '0 0 48%', marginRight: '2%' }}>
          <Divider orientation="left">Ev Alırken Dikkat Edin!</Divider>
          <div>
            <Card title="Ev alırken kendinizi emin ellere bırakın biz buradayız!" className="card">
              <p>Siz arkanıza yaslanın, biz size en uygun evi bulalım!</p>
              <img src="https://i.hizliresim.com/9mgnn1o.png" alt="İçerik 1" style={{ width: '100%', height: '269.3px', objectFit: 'cover' }} />
            </Card>
          </div>
        </div>
        <div style={{ flex: '0 0 48%' }}>
          <Divider orientation="left">Güvenilir Hizmet</Divider>
          <div>
            <Card title="Güvenilir Kadromuz" className="card">
              <p>Uzman danışmanlarımız, geniş bir emlak portföyü ve detaylı bilgi birikimi ile her adımda müşterilerimize destek olmaktadır. Sektördeki güncel gelişmeleri takip eden ve müşteri odaklı çalışan kadromuz, ev arama sürecinizde size en uygun seçenekleri sunmak için burada!</p>
              <img src="https://i.hizliresim.com/eva5eb1.jpg" alt="İçerik 2" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </Card>
          </div>
        </div>
      </div>

      <div>
        <Divider orientation="left">İletişim</Divider>
        <Card title="Bize Ulaşın" className="card">
          <p><EnvironmentTwoTone style={{ fontSize: '24px' }} /> Adres: Muğla, Türkiye</p>
          <p><PhoneTwoTone style={{ fontSize: '24px' }} /> Telefon: +90 252 212 1313</p>
          <p><MailTwoTone style={{ fontSize: '24px' }} /> E-posta: info@zeyhelsirketlergrubu.com</p>
        </Card>
      </div>

      <div className="social-icons">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <InstagramFilled style={{ fontSize: '40px' }} />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FacebookFilled style={{ fontSize: '40px' }} />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <TwitterCircleFilled style={{ fontSize: '40px' }} />
        </a>
      </div>
    </div>
  );
};

export default Homepage;
