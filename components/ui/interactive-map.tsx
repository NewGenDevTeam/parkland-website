'use client';

import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/* ── Leaflet default-icon fix (required in Next.js / Webpack) ────────────── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

/* ── Marker factory: gold Parkland pin ───────────────────────────────────── */
function goldPin(): L.DivIcon {
  return L.divIcon({
    className:   '',
    iconSize:    [30, 46],
    iconAnchor:  [15, 46],
    popupAnchor: [0, -50],
    html: `<svg width="30" height="46" viewBox="0 0 30 46" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="pkdrop" x="-60%" y="-40%" width="220%" height="200%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="rgba(0,0,0,0.28)"/>
        </filter>
      </defs>
      <path d="M15 0C6.716 0 0 6.716 0 15 0 26.25 15 46 15 46S30 26.25 30 15C30 6.716 23.284 0 15 0z"
        fill="#C8A97E" stroke="#9D7B58" stroke-width="1.2" filter="url(#pkdrop)"/>
      <circle cx="15" cy="15" r="6.5" fill="white" fill-opacity="0.96"/>
      <circle cx="15" cy="15" r="3.5" fill="#C8A97E"/>
    </svg>`,
  });
}

/* ── Marker factory: small coloured dot for POIs ─────────────────────────── */
function dot(color: string): L.DivIcon {
  return L.divIcon({
    className:   '',
    iconSize:    [13, 13],
    iconAnchor:  [6,  6],
    popupAnchor: [0, -9],
    html: `<div style="width:13px;height:13px;background:${color};border-radius:50%;border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.30)"></div>`,
  });
}

/* ── Location data ───────────────────────────────────────────────────────── */

const PARKLAND: [number, number] = [1.5584, 103.7697];
const MAP_CENTER: [number, number] = [1.515, 103.768]; // framed to show site + CIQ together

const POIS: {
  id:    number;
  pos:   [number, number];
  name:  string;
  tag:   string;
  color: string;
}[] = [
  { id: 1, pos: [1.4655, 103.7617], name: 'JB CIQ Complex',        tag: 'Transport · ~8 km',     color: '#3B82F6' },
  { id: 2, pos: [1.4652, 103.7608], name: 'RTS Bukit Chagar',       tag: 'Transport · ~8 km',     color: '#3B82F6' },
  { id: 3, pos: [1.5565, 103.7780], name: 'AEON Mall Permas Jaya',  tag: 'Retail · ~3 km',        color: '#10B981' },
  { id: 4, pos: [1.5667, 103.7544], name: 'Columbia Asia Hospital', tag: 'Healthcare · ~3 km',    color: '#EF4444' },
  { id: 5, pos: [1.5610, 103.7615], name: 'Permas Jaya Golf Club',  tag: 'Recreation · ~2 km',    color: '#F59E0B' },
  { id: 6, pos: [1.5090, 103.7506], name: 'Midvalley Southkey',     tag: 'Retail · ~6 km',        color: '#10B981' },
  { id: 7, pos: [1.5580, 103.7900], name: 'Major Highways',         tag: 'Accessibility · ~2 km', color: '#8B5CF6' },
];

/* ── Popup style helpers (inline so no className conflicts) ──────────────── */
const POP_TITLE: React.CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  fontWeight: 700,
  fontSize:   13,
  color:      '#1a1209',
  marginBottom: 3,
};
const POP_SUB: React.CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  fontSize:   11,
  color:      '#7a6040',
};
const POI_TITLE: React.CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  fontWeight: 600,
  fontSize:   12,
  color:      '#111',
  marginBottom: 2,
};
const POI_TAG: React.CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  fontSize:   11,
  color:      '#555',
};

/* ── Component ───────────────────────────────────────────────────────────── */

export function ParklandMap({ height = 420 }: { height?: number }) {
  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={12}
      style={{ height, width: '100%' }}
      scrollWheelZoom={false}
      zoomControl={true}
      attributionControl={true}
    >
      {/* CartoDB Positron — clean, premium light basemap */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        maxZoom={19}
      />

      {/* 8 km dashed reference ring centered on Parkland */}
      <Circle
        center={PARKLAND}
        radius={8000}
        pathOptions={{
          color:       '#C8A97E',
          weight:      1.5,
          fillColor:   '#C8A97E',
          fillOpacity: 0.04,
          dashArray:   '5 4',
        }}
      />

      {/* ── Gold Parkland pin ── */}
      <Marker position={PARKLAND} icon={goldPin()}>
        <Popup>
          <div style={{ minWidth: 160, padding: '2px 0' }}>
            <div style={POP_TITLE}>Parkland By The River</div>
            <div style={POP_SUB}>Permas Jaya, Johor Bahru</div>
          </div>
        </Popup>
      </Marker>

      {/* ── POI dot markers ── */}
      {POIS.map((p) => (
        <Marker key={p.id} position={p.pos} icon={dot(p.color)}>
          <Popup>
            <div style={{ minWidth: 140, padding: '2px 0' }}>
              <div style={POI_TITLE}>{p.name}</div>
              <div style={POI_TAG}>{p.tag}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
