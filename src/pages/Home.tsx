import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import RecyclingIcon from '@mui/icons-material/Recycling';
import MapIcon from '@mui/icons-material/Map';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InsightsIcon from '@mui/icons-material/Insights';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

const Home = () => {
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0f7fa 0%, #e8f5e9 100%)' }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom fontWeight={700} color="primary.main">
            Yapay Zeka Destekli Akıllı Atık Yönetim Sistemi
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Sürdürülebilir şehirler için akıllı, verimli ve çevreci atık yönetimi. Yapay zeka ile daha temiz bir gelecek!
          </Typography>
          <Button variant="contained" size="large" color="primary" sx={{ mt: 3, px: 5, py: 1.5, fontWeight: 600 }} href="/market">
            Hemen Keşfet
          </Button>
        </Box>

        {/* How It Works Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" align="center" fontWeight={600} gutterBottom>
            Nasıl Çalışır?
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
            <Box sx={{ width: { xs: '100%', md: '30%' }, minWidth: 260 }}>
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
                <RecyclingIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Akıllı Sensörler
                </Typography>
                <Typography color="text.secondary">
                  Atık konteynerlerine yerleştirilen sensörler doluluk, sıcaklık ve sağlık verilerini toplar.
                </Typography>
              </Paper>
            </Box>
            <Box sx={{ width: { xs: '100%', md: '30%' }, minWidth: 260 }}>
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
                <AutoAwesomeIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Yapay Zeka Analizi
                </Typography>
                <Typography color="text.secondary">
                  Toplanan veriler yapay zeka ile analiz edilerek en verimli toplama rotaları ve bakım zamanları belirlenir.
                </Typography>
              </Paper>
            </Box>
            <Box sx={{ width: { xs: '100%', md: '30%' }, minWidth: 260 }}>
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
                <MapIcon sx={{ fontSize: 60, color: 'info.main', mb: 2 }} />
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Gerçek Zamanlı Takip
                </Typography>
                <Typography color="text.secondary">
                  Harita ve panel üzerinden tüm konteynerlerin ve çiplerin durumu anlık olarak izlenir.
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Box>

        {/* Why AI Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" align="center" fontWeight={600} gutterBottom>
            Neden Yapay Zeka?
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
            <Box sx={{ width: { xs: '100%', md: '30%' }, minWidth: 260 }}>
              <Paper elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
                <InsightsIcon sx={{ fontSize: 50, color: 'secondary.main', mb: 2 }} />
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Akıllı Tahmin
                </Typography>
                <Typography color="text.secondary">
                  Atık miktarı ve doluluk oranı tahmini ile kaynaklar daha verimli kullanılır.
                </Typography>
              </Paper>
            </Box>
            <Box sx={{ width: { xs: '100%', md: '30%' }, minWidth: 260 }}>
              <Paper elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
                <PrecisionManufacturingIcon sx={{ fontSize: 50, color: 'success.main', mb: 2 }} />
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Operasyonel Optimizasyon
                </Typography>
                <Typography color="text.secondary">
                  Toplama rotaları ve bakım süreçleri optimize edilerek maliyetler azaltılır.
                </Typography>
              </Paper>
            </Box>
            <Box sx={{ width: { xs: '100%', md: '30%' }, minWidth: 260 }}>
              <Paper elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
                <AnalyticsIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Veri Analitiği
                </Typography>
                <Typography color="text.secondary">
                  Gelişmiş raporlama ve analiz ile karar destek süreçleri güçlendirilir.
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button variant="contained" color="secondary" size="large" href="/login" sx={{ px: 6, py: 2, fontWeight: 600 }}>
            Sisteme Giriş Yap
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 