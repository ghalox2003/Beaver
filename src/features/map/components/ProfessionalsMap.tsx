import { MapPin } from 'lucide-react'
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'
import { Link } from 'react-router-dom'
import type { Professional } from '../../professionals'

type ProfessionalsMapProps = {
  professionals: Professional[]
  selectedId?: string
  onSelect?: (id: string) => void
}

function MapViewport({
  professionals,
  selectedId,
}: {
  professionals: Professional[]
  selectedId?: string
}) {
  const map = useMap()

  const selected = professionals.find((professional) => professional.id === selectedId)

  if (selected) {
    map.flyTo([selected.latitude, selected.longitude], Math.max(map.getZoom(), 8), {
      duration: 0.7,
    })
  }

  return null
}

function ProfessionalsMap({
  professionals,
  selectedId,
  onSelect,
}: ProfessionalsMapProps) {
  return (
    <div className="h-full min-h-[460px] overflow-hidden rounded-3xl border border-forest-900/10 bg-cream-dark shadow-sm">
      <MapContainer
        center={[46, 7]}
        zoom={3}
        scrollWheelZoom
        className="h-full min-h-[460px] w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapViewport professionals={professionals} selectedId={selectedId} />

        {professionals.map((professional) => (
          <CircleMarker
            key={professional.id}
            center={[professional.latitude, professional.longitude]}
            radius={selectedId === professional.id ? 11 : 8}
            pathOptions={{
              color: '#fbf7ee',
              fillColor: '#10352a',
              fillOpacity: 1,
              weight: 3,
            }}
            eventHandlers={{
              click: () => onSelect?.(professional.id),
            }}
          >
            <Popup>
              <div className="min-w-[190px] font-sans text-forest-900">
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-forest-900 text-xs font-extrabold text-sage">
                    {professional.fullName
                      .split(' ')
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join('')}
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-forest-700">
                      {professional.trade.name}
                    </p>
                    <p className="font-bold">{professional.businessName}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-forest-900/60">
                  <MapPin className="size-3.5" />
                  {professional.location}
                </div>

                <Link
                  to={`/professionals/${professional.id}`}
                  className="mt-3 inline-flex text-sm font-bold !text-forest-800"
                >
                  Open profile →
                </Link>
              </div>
            </Popup>
          </CircleMarker>
        ))}

      </MapContainer>
    </div>
  )
}

export default ProfessionalsMap
