import React, { useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
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

// Özel konteyner ikonları
const createContainerIcon = (container: any) => {
  // Öncelik sağlık oranı, yoksa doluluk oranı
  const value = typeof container.health === 'number' ? container.health : container.fillLevel;
  let color = 'blue';
  if (value >= 80) {
    color = 'red';
  } else if (value >= 50) {
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

// Örnek konteyner verileri
const containers = [
  {
    id: 1,
    name: 'Konteyner A',
    position: [41.0082, 28.9784],
    fillLevel: 75,
    lastUpdate: '09.05.2025 10:00',
    acceptedTypes: ['Endüstriyel', 'Teknolojik', 'Ev'],
  },
  {
    id: 2,
    name: 'Konteyner B',
    position: [41.0422, 29.0083],
    fillLevel: 45,
    lastUpdate: '09.05.2025 10:00',
    acceptedTypes: ['Endüstriyel', 'Teknolojik', 'Ev'],
  },
  {
    id: 3,
    name: 'Konteyner C',
    position: [41.0662, 29.0167],
    fillLevel: 90,
    lastUpdate: '09.05.2025 10:00',
    acceptedTypes: ['Endüstriyel', 'Teknolojik', 'Ev'],
  },
  {
    id: 4,
    name: 'Konteyner D',
    position: [41.0152, 28.9555],
    fillLevel: 30,
    lastUpdate: '09.05.2025 10:00',
    acceptedTypes: ['Endüstriyel', 'Teknolojik', 'Ev'],
  },
  {
    id: 5,
    name: 'Konteyner E',
    position: [41.0333, 28.9833],
    fillLevel: 60,
    lastUpdate: '09.05.2025 10:00',
    acceptedTypes: ['Endüstriyel', 'Teknolojik', 'Ev'],
  },
  {
    id: 6,
    name: 'Konteyner F',
    position: [41.0167, 28.9333],
    fillLevel: 85,
    lastUpdate: '09.05.2025 10:00',
    acceptedTypes: ['Endüstriyel', 'Teknolojik', 'Ev'],
  },
  {
    id: 7,
    name: 'Konteyner G',
    position: [41.0833, 29.0167],
    fillLevel: 25,
    lastUpdate: '09.05.2025 10:00',
    acceptedTypes: ['Endüstriyel', 'Teknolojik', 'Ev'],
  },
  {
    id: 8,
    name: 'Konteyner H',
    position: [41.0167, 28.9000],
    fillLevel: 95,
    lastUpdate: '09.05.2025 10:00',
    acceptedTypes: ['Endüstriyel', 'Teknolojik', 'Ev'],
  }
];

const Map = () => {
  const [selectedContainer, setSelectedContainer] = useState<typeof containers[0] | null>(null);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Konteyner Haritası
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
              {containers.map((container) => (
                <Marker
                  key={container.id}
                  position={container.position as [number, number]}
                  icon={createContainerIcon(container)}
                  eventHandlers={{
                    click: () => setSelectedContainer(container),
                  }}
                >
                  <Popup>
                    <Box sx={{ minWidth: 200 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        {container.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Doluluk Oranı: {container.fillLevel}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Kabul Edilen Atık Tipleri:
                      </Typography>
                      {container.acceptedTypes.map((type) => (
                        <Typography key={type} variant="body2" color="text.secondary" sx={{ pl: 2 }}>
                          • {type}
                        </Typography>
                      ))}
                      <Typography variant="body2" color="text.secondary">
                        Son Güncelleme: {container.lastUpdate}
                      </Typography>
                    </Box>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Paper>
        </Box>

        {/* Sağ Panel - Konteyner Listesi */}
        <Box sx={{ flex: { md: 1 }, height: 'calc(100vh - 200px)', overflow: 'auto' }}>
          <Paper sx={{ height: '100%', p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Konteyner Listesi
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {containers.map((container) => (
                <Paper
                  key={container.id}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    bgcolor: selectedContainer?.id === container.id ? 'action.selected' : 'inherit',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                  onClick={() => setSelectedContainer(container)}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1">{container.name}</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: container.fillLevel >= 80 ? 'error.main' : container.fillLevel >= 50 ? 'warning.main' : 'success.main',
                      }}
                    >
                      {container.fillLevel}%
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Kabul Edilen Atık Tipleri:
                  </Typography>
                  {container.acceptedTypes.map((type) => (
                    <Typography key={type} variant="body2" color="text.secondary" sx={{ pl: 2 }}>
                      • {type}
                    </Typography>
                  ))}
                  <Typography variant="body2" color="text.secondary">
                    Son Güncelleme: {container.lastUpdate}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Map; 