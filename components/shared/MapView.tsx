import React, { useMemo } from 'react';

interface MapPin {
  id?: string | number;
  x: number;
  y: number;
  color: string;
  label?: string;
}

interface MapViewProps {
  pins?: MapPin[];
  className?: string;
  onPinClick?: (id: string | number) => void;
  selectedPinId?: string | number;
  alwaysShowLabels?: boolean;
  showRoute?: boolean;
}

const MapView: React.FC<MapViewProps> = ({ pins = [], className = '', onPinClick, selectedPinId, alwaysShowLabels = false, showRoute = false }) => {
  // Sort pins to bring the selected one to the front for correct z-index rendering
  const sortedPins = useMemo(() => {
    if (!selectedPinId) return pins;
    return [...pins].sort((a, b) => {
        if (a.id === selectedPinId) return 1;
        if (b.id === selectedPinId) return -1;
        return 0;
    });
  }, [pins, selectedPinId]);

  return (
    <div className={`w-full h-full bg-light-100 dark:bg-dark-800 rounded-lg overflow-hidden ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 300 180">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="strokeWidth">
            <polygon points="0 0, 10 3.5, 0 7" fill="#0ea5e9" />
          </marker>
          <filter id="drop-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0.5" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.2" />
          </filter>
           <filter id="building-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="1.5" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* SVG specific styles for light and dark modes */}
        <style>{`
          .map-base { fill: #f0f0f0; }
          .dark .map-base { fill: #2d3748; }
          
          .park-area { fill: #e0f0d8; }
          .dark .park-area { fill: #3a4c3a; }

          .water-area { fill: #cce7f0; }
          .dark .water-area { fill: #3a5b6f; }

          .road-casing { stroke: #e0e0e0; }
          .dark .road-casing { stroke: #263140; }

          .road-major-fill { stroke: #fde68a; }
          .dark .road-major-fill { stroke: #927f48; }

          .road-minor-fill { stroke: #ffffff; }
          .dark .road-minor-fill { stroke: #4a5568; }
          
          .road-centerline { stroke: rgba(100, 100, 100, 0.4); }
          .dark .road-centerline { stroke: rgba(240, 240, 240, 0.3); }

          .building-block { fill: #e5e5e5; stroke: #d4d4d4; }
          .dark .building-block { fill: #718096; stroke: #4a5568; }

          .map-pin {
            cursor: pointer;
            outline: none;
          }
          .map-pin .pin-content {
            transition: transform 0.2s ease-in-out;
          }
          .map-pin:hover .pin-content, .map-pin:focus .pin-content {
            transform: scale(1.3) translateY(-3px);
          }
          .pin-label-bg {
            fill: rgba(255, 255, 255, 0.9);
            stroke: rgba(200, 200, 200, 0.7);
          }
          .dark .pin-label-bg {
            fill: rgba(44, 62, 80, 0.9);
            stroke: rgba(127, 140, 141, 0.7);
          }
          .pin-label-text {
            font-size: 9px;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            fill: #2c3e50;
          }
          .dark .pin-label-text {
            fill: #ecf0f1;
          }
          .selected-pin-glow {
              animation: pulse 1.5s infinite ease-out;
              stroke: var(--selected-glow-color, #f87171);
              stroke-width: 2.5;
              fill: none;
          }
          @keyframes pulse {
              0% { transform: scale(0.9); opacity: 1; }
              70% { transform: scale(3.5); opacity: 0; }
              100% { transform: scale(0.9); opacity: 0; }
          }
        `}</style>

        {/* Base layer */}
        <rect width="300" height="180" className="map-base" />
        <path d="M 180,0 C 160,50 200,80 170,120 L 190,180 H 220 C 230,130 190,60 210,0 Z" className="water-area" />
        <path d="M 0,0 L 80,0 C 60,30 90,60 70,90 L 0,110 Z" className="park-area" />
        <circle cx="150" cy="140" r="30" className="park-area" />

        {/* Roads */}
        <g strokeLinecap="round">
            <path d="M 0,120 Q 150,130 300,90" strokeWidth="10" className="road-casing" fill="none"/>
            <path d="M 0,120 Q 150,130 300,90" strokeWidth="8" className="road-major-fill" fill="none"/>
            <path d="M 0,120 Q 150,130 300,90" strokeWidth="0.5" strokeDasharray="3 3" className="road-centerline" fill="none"/>
            
            <path d="M 120,0 V 180" strokeWidth="10" className="road-casing" fill="none"/>
            <path d="M 120,0 V 180" strokeWidth="8" className="road-major-fill" fill="none"/>
            <path d="M 120,0 V 180" strokeWidth="0.5" strokeDasharray="3 3" className="road-centerline" fill="none"/>

            <path d="M 40,60 H 180" strokeWidth="5" className="road-casing" fill="none"/>
            <path d="M 40,60 H 180" strokeWidth="4" className="road-minor-fill" fill="none"/>
            <path d="M 250,40 V 150" strokeWidth="5" className="road-casing" fill="none"/>
            <path d="M 250,40 V 150" strokeWidth="4" className="road-minor-fill" fill="none"/>
            <path d="M 10,20 H 90" strokeWidth="4" className="road-casing" fill="none"/>
            <path d="M 10,20 H 90" strokeWidth="3" className="road-minor-fill" fill="none"/>
        </g>
        
        {/* Buildings with 3D effect */}
        <g className="building-block" strokeWidth="0.5" filter="url(#building-shadow)">
          <rect x="15" y="25" width="20" height="15" rx="1" />
          <rect x="50" y="20" width="30" height="25" rx="1" />
          <rect x="15" y="140" width="60" height="30" rx="2" />
          <rect x="130" y="15" width="25" height="50" rx="1" />
          <rect x="135" y="85" width="20" height="20" rx="1" />
          <rect x="235" y="10" width="40" height="20" rx="1" />
          <rect x="265" y="160" width="30" height="15" rx="1" />
        </g>
        
        {/* Route Line */}
        {showRoute && pins.length > 1 && (
          <path
            d={`M ${pins.map(p => `${p.x},${p.y}`).join(' L ')}`}
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="2.5"
            strokeDasharray="5 3"
            strokeLinecap="round"
            markerEnd="url(#arrowhead)"
            style={{ filter: 'url(#drop-shadow)' }}
          />
        )}
        
        {/* Pins */}
        {sortedPins.map((pin) => {
          const isSelected = pin.id !== undefined && pin.id === selectedPinId;
          const showLabel = pin.label && (isSelected || alwaysShowLabels);
          
          const handleInteraction = (e: React.MouseEvent | React.KeyboardEvent) => {
              if (e.type === 'click' || (e.type === 'keydown' && (e as React.KeyboardEvent).key === 'Enter')) {
                  e.preventDefault();
                  if (pin.id && onPinClick) {
                      onPinClick(pin.id);
                  }
              }
          };

          return (
            <g
              key={pin.id || `${pin.x}-${pin.y}`}
              onClick={handleInteraction}
              onKeyDown={handleInteraction}
              aria-label={`Map pin for ${pin.label || `pin at ${pin.x}, ${pin.y}`}`}
              className="map-pin"
              transform={`translate(${pin.x}, ${pin.y})`}
              role="button"
              tabIndex={0}
            >
              <g className="pin-content" style={{ transform: isSelected ? 'scale(1.4) translateY(-4px)' : 'scale(1)'} as React.CSSProperties}>
                {isSelected && <circle cx="0" cy="-15" r="8" className="selected-pin-glow" style={{'--selected-glow-color': pin.color} as React.CSSProperties} />}
                <g filter="url(#drop-shadow)">
                  <path d="M0,0 C-3,-6 -10,-20 0,-20 C10,-20 3,-6 0,0 Z" fill={pin.color} />
                  <circle cx="0" cy="-15" r="4" fill="white" />
                </g>
                {showLabel && (
                  <g transform="translate(0, -28)">
                    <rect x={-((pin.label!.length * 5 + 8)/2)} y="-9" width={pin.label!.length * 5 + 8} height="13" rx="3" className="pin-label-bg" strokeWidth="0.5" />
                    <text x="0" y="0.5" className="pin-label-text" textAnchor="middle">{pin.label}</text>
                  </g>
                )}
              </g>
            </g>
          )
        })}
      </svg>
    </div>
  );
};

export default MapView;
