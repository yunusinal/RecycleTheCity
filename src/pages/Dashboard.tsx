import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Stack,
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Leaflet marker icon düzeltmesi
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Özel marker ikonları
const createCustomIcon = (health: number) => {
  let color = 'red';
  if (health >= 80) {
    color = 'green';
  } else if (health >= 50) {
    color = 'orange';
  }
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

// Örnek veri
const sampleChips = [
  {
    id: 1,
    name: 'Çip #A123',
    position: [41.0082, 28.9784], // Sultanahmet
    health: 85,
    status: 'active',
    metrics: {
      batteryLevel: 92,
      signalStrength: 88,
      lastUpdate: '09.05.2025 12:00',
      temperature: 24,
      humidity: 45,
    },
  },
  {
    id: 2,
    name: 'Çip #B456',
    position: [41.0422, 29.0083], // Beşiktaş
    health: 92,
    status: 'active',
    metrics: {
      batteryLevel: 95,
      signalStrength: 92,
      lastUpdate: '09.05.2025 12:00 ',
      temperature: 23,
      humidity: 42,
    },
  },
  {
    id: 3,
    name: 'Çip #C789',
    position: [41.0662, 29.0167], // Sarıyer
    health: 78,
    status: 'warning',
    metrics: {
      batteryLevel: 65,
      signalStrength: 72,
      lastUpdate: '09.05.2025 12:00 ',
      temperature: 26,
      humidity: 48,
    },
  },
  {
    id: 4,
    name: 'Çip #D321',
    position: [41.0152, 28.9555], // Zeytinburnu
    health: 45,
    status: 'error',
    metrics: {
      batteryLevel: 12,
      signalStrength: 35,
      lastUpdate: '09.05.2025 12:00',
      temperature: 32,
      humidity: 65,
    },
  },
  {
    id: 5,
    name: 'Çip #E654',
    position: [41.0333, 28.9833], // Şişli
    health: 95,
    status: 'active',
    metrics: {
      batteryLevel: 98,
      signalStrength: 95,
      lastUpdate: '09.05.2025 12:00 ',
      temperature: 22,
      humidity: 40,
    },
  },
  {
    id: 6,
    name: 'Çip #F987',
    position: [41.0167, 28.9333], // Bakırköy
    health: 68,
    status: 'warning',
    metrics: {
      batteryLevel: 45,
      signalStrength: 82,
      lastUpdate: '09.05.2025 12:00 ',
      temperature: 28,
      humidity: 52,
    },
  },
  {
    id: 7,
    name: 'Çip #G147',
    position: [41.0833, 29.0167], // Beykoz
    health: 88,
    status: 'active',
    metrics: {
      batteryLevel: 85,
      signalStrength: 90,
      lastUpdate: '09.05.2025 12:00 ',
      temperature: 25,
      humidity: 44,
    },
  },
  {
    id: 8,
    name: 'Çip #H258',
    position: [41.0167, 28.9000], // Küçükçekmece
    health: 32,
    status: 'error',
    metrics: {
      batteryLevel: 8,
      signalStrength: 25,
        lastUpdate: '09.05.2025 12:00 ',
      temperature: 35,
      humidity: 70,
    },
  }
];

const Dashboard = () => {
  const [selectedChip, setSelectedChip] = useState<typeof sampleChips[0] | null>(null);

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'success';
    if (health >= 70) return 'warning';
    return 'error';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Kurumsal Panel
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Harita */}
        <Box sx={{ flex: { md: 2 }, height: 'calc(100vh - 200px)' }}>
          <Paper sx={{ height: '100%', overflow: 'hidden' }}>
            <MapContainer
              center={[41.0082, 28.9784]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {sampleChips.map((chip) => (
                <Marker
                  key={chip.id}
                  position={chip.position as [number, number]}
                  icon={createCustomIcon(chip.health)}
                  eventHandlers={{
                    click: () => setSelectedChip(chip),
                  }}
                >
                  <Popup>
                    <Box sx={{ minWidth: 200 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        {chip.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Sağlık Durumu: {chip.health}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Batarya: {chip.metrics.batteryLevel}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Son Güncelleme: {chip.metrics.lastUpdate}
                      </Typography>
                    </Box>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Paper>
        </Box>

        {/* Orta Panel - Çip Listesi */}
        <Box sx={{ flex: { md: 1 }, height: 'calc(100vh - 200px)', overflow: 'auto' }}>
          <Paper sx={{ height: '100%', p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Çip Listesi
            </Typography>
            <List>
              {sampleChips.map((chip) => (
                <React.Fragment key={chip.id}>
                  <ListItem
                    component="div"
                    sx={{ 
                      cursor: 'pointer',
                      bgcolor: selectedChip?.id === chip.id ? 'action.selected' : 'inherit'
                    }}
                    onClick={() => setSelectedChip(chip)}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1">{chip.name}</Typography>
                          <Chip
                            label={chip.status === 'active' ? 'Aktif' : 'Uyarı'}
                            size="small"
                            color={getStatusColor(chip.status) as any}
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Sağlık: {chip.health}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Son Güncelleme: {chip.metrics.lastUpdate}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>

        {/* Sağ Panel - Detaylar */}
        <Box sx={{ flex: { md: 1 }, height: 'calc(100vh - 200px)', overflow: 'auto' }}>
          <Paper sx={{ height: '100%', p: 2 }}>
            {/* Genel İstatistikler */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Genel İstatistikler
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Toplam Çip
                  </Typography>
                  <Typography variant="h4">{sampleChips.length}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Ortalama Sağlık
                  </Typography>
                  <Typography variant="h4">
                    {Math.round(
                      sampleChips.reduce((acc, chip) => acc + chip.health, 0) /
                        sampleChips.length
                    )}
                    %
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Seçili Çip Detayları */}
            <Typography variant="h6" gutterBottom>
              {selectedChip ? `${selectedChip.name} Detayları` : 'Çip Seçilmedi'}
            </Typography>
            {selectedChip ? (
              <Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Sağlık Durumu
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={selectedChip.health}
                        color={getHealthColor(selectedChip.health) as any}
                        sx={{ height: 10, borderRadius: 5 }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {selectedChip.health}%
                    </Typography>
                  </Box>
                </Box>

                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Batarya Durumu
                    </Typography>
                    <Typography variant="body2">
                      {selectedChip.metrics.batteryLevel}%
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Sinyal Gücü
                    </Typography>
                    <Typography variant="body2">
                      {selectedChip.metrics.signalStrength}%
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Sıcaklık
                    </Typography>
                    <Typography variant="body2">
                      {selectedChip.metrics.temperature}°C
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Nem
                    </Typography>
                    <Typography variant="body2">
                      {selectedChip.metrics.humidity}%
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Son Güncelleme
                    </Typography>
                    <Typography variant="body2">
                      {selectedChip.metrics.lastUpdate}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ) : (
              <Typography color="text.secondary">
                Detayları görüntülemek için haritadan bir çip seçin
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard; 