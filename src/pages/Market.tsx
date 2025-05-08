import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Tabs,
  Tab,
  Rating,
  IconButton,
  Badge,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import MemoryIcon from '@mui/icons-material/Memory';
import DevicesIcon from '@mui/icons-material/Devices';
import RecyclingIcon from '@mui/icons-material/Recycling';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  rating: number;
  stock: number;
  category: 'materials' | 'devices' | 'chips';
  purity?: string;
  source?: string;
}

// Örnek ürün verileri
const products: Record<'materials' | 'devices' | 'chips', Product[]> = {
  materials: [
    {
      id: 1,
      name: 'Geri Dönüştürülmüş Altın',
      price: '₺1.850/gr',
      image: '/images/altin.jpg',
      description: 'Elektronik cihazlardan geri kazanılmış 24K altın',
      rating: 4.9,
      stock: 500,
      category: 'materials',
      purity: '99.9%',
      source: 'Elektronik Kartlar',
    },
    {
      id: 2,
      name: 'Geri Dönüştürülmüş Bakır',
      price: '₺180/kg',
      image: '/images/bakir.jpg',
      description: 'Elektronik devrelerden geri kazanılmış saf bakır',
      rating: 4.7,
      stock: 2000,
      category: 'materials',
      purity: '99.95%',
      source: 'Elektronik Kablolar',
    },
    {
      id: 3,
      name: 'Geri Dönüştürülmüş Alüminyum',
      price: '₺85/kg',
      image: '/images/aluminyum.jpg',
      description: 'Elektronik kasalardan geri kazanılmış alüminyum',
      rating: 4.5,
      stock: 3000,
      category: 'materials',
      purity: '99.8%',
      source: 'Cihaz Gövdeleri',
    },
    {
      id: 4,
      name: 'Geri Dönüştürülmüş Gümüş',
      price: '₺950/gr',
      image: '/images/gumus.jpeg',
      description: 'Elektronik bileşenlerden geri kazanılmış saf gümüş',
      rating: 4.8,
      stock: 800,
      category: 'materials',
      purity: '99.9%',
      source: 'Elektronik Devreler',
    },
    {
      id: 5,
      name: 'Geri Dönüştürülmüş Paladyum',
      price: '₺2.500/gr',
      image: '/images/paladyum.png',
      description: 'Elektronik kartlardan geri kazanılmış paladyum',
      rating: 4.9,
      stock: 200,
      category: 'materials',
      purity: '99.95%',
      source: 'Elektronik Bileşenler',
    },
  ],
  devices: [
    {
      id: 4,
      name: 'Yenilenmiş iPhone 12',
      price: '₺12.999',
      image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=500&h=500&fit=crop',
      description: 'Tamamen yenilenmiş, 1 yıl garanti',
      rating: 4.8,
      stock: 5,
      category: 'devices',
    },
    {
      id: 5,
      name: 'Yenilenmiş Samsung Galaxy S21',
      price: '₺9.999',
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop',
      description: 'Yeni batarya ve ekran ile yenilenmiş',
      rating: 4.6,
      stock: 8,
      category: 'devices',
    },
    {
      id: 6,
      name: 'Yenilenmiş MacBook Air',
      price: '₺15.999',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
      description: '2020 model, yeni klavye ve batarya',
      rating: 4.9,
      stock: 3,
      category: 'devices',
    },
  ],
  chips: [
    {
      id: 7,
      name: 'Akıllı Atık Çipi A1',
      price: '₺299',
      image: '/images/chip.jpeg',
      description: 'Doluluk oranı ve sıcaklık sensörlü',
      rating: 4.7,
      stock: 50,
      category: 'chips',
    },
    {
      id: 8,
      name: 'Akıllı Atık Çipi B1',
      price: '₺399',
      image: '/images/chip.jpeg',
      description: 'Gelişmiş sensörler ve uzun ömürlü batarya',
      rating: 4.9,
      stock: 30,
      category: 'chips',
    },
    {
      id: 9,
      name: 'Akıllı Atık Çipi C1',
      price: '₺499',
      image: '/images/chip.jpeg',
      description: 'Premium model, tüm sensörler ve 5 yıl garanti',
      rating: 5.0,
      stock: 20,
      category: 'chips',
    },
  ],
};

const Market = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const renderProducts = (category: 'materials' | 'devices' | 'chips') => {
    return products[category].map((product) => (
      <Box sx={{ width: { xs: '100%', sm: '25%' }, p: 1 }} key={product.id}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.name}
            />
            <IconButton
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'background.paper' },
              }}
              onClick={() => toggleFavorite(product.id)}
            >
              {favorites.includes(product.id) ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Box>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" component="h2">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {product.description}
            </Typography>
            {product.category === 'materials' && product.purity && product.source && (
              <>
                <Typography variant="body2" color="text.secondary">
                  Saflık: {product.purity}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Kaynak: {product.source}
                </Typography>
              </>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Rating value={product.rating} precision={0.5} readOnly size="small" />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.rating})
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Chip
                icon={<LocalOfferIcon />}
                label={product.price}
                color="primary"
                size="small"
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ ml: 1 }}
              >
                Stok: {product.stock}
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              fullWidth
            >
              Sepete Ekle
            </Button>
          </CardContent>
        </Card>
      </Box>
    ));
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Geri Dönüşüm Marketi
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="market categories"
        >
          <Tab
            icon={<RecyclingIcon />}
            label="Geri Dönüştürülmüş Hammadde"
            iconPosition="start"
          />
          <Tab
            icon={<DevicesIcon />}
            label="Yenilenmiş Cihazlar"
            iconPosition="start"
          />
          <Tab
            icon={<MemoryIcon />}
            label="Akıllı Atık Çipleri"
            iconPosition="start"
          />
        </Tabs>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {selectedTab === 0 && renderProducts('materials')}
        {selectedTab === 1 && renderProducts('devices')}
        {selectedTab === 2 && renderProducts('chips')}
      </Box>
    </Container>
  );
};

export default Market; 