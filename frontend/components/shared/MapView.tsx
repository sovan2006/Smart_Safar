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
          {/* Filters for texture and depth */}
          <filter id="drop-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0.5" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.2" />
          </filter>
           <filter id="building-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="1.5" dy="2" stdDeviation="1" floodColor="#000" floodOpacity="0.25" />
          </filter>
          <filter id="subtle-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" result="turbulence"/>
            <feComposite operator="in" in="turbulence" in2="SourceGraphic" result="textured"/>
            <feColorMatrix in="textured" type="saturate" values="0.2" result="desaturated"/>
          </filter>

          {/* Gradients for water and parks */}
          <linearGradient id="water-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#a8dadc' }} />
            <stop offset="100%" style={{ stopColor: '#457b9d' }} />
          </linearGradient>
          <radialGradient id="park-gradient">
            <stop offset="0%" stopColor="#80b918" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#55a630" stopOpacity="0.9" />
          </radialGradient>

          {/* Patterns for ground */}
          <pattern id="ground-pattern" patternUnits="userSpaceOnUse" width="10" height="10">
            <rect width="10" height="10" className="ground-pattern-bg" />
            <circle cx="5" cy="5" r="0.5" className="ground-pattern-dot" />
          </pattern>
        </defs>

        {/* SVG specific styles for light and dark modes */}
        <style>{`
          .map-base { fill: #f4f3ee; }
          .dark .map-base { fill: #2c3e50; }
          
          .ground-pattern-bg { fill: #e0e0e0; }
          .dark .ground-pattern-bg { fill: #34495e; }
          .ground-pattern-dot { fill: rgba(0,0,0,0.05); }
          .dark .ground-pattern-dot { fill: rgba(255,255,255,0.03); }

          .park-area { fill: url(#park-gradient); filter: url(#subtle-texture); }
          .dark .park-area { opacity: 0.7; }

          .water-area { fill: url(#water-gradient); }
          .dark .water-area { opacity: 0.8; }

          .road-casing { stroke: #d1d1d1; }
          .dark .road-casing { stroke: #2c3e50; }

          .road-fill { stroke: #ffffff; }
          .dark .road-fill { stroke: #7f8c8d; }

          .road-secondary-fill { stroke: #e9e9e9; }
          .dark .road-secondary-fill { stroke: #636e72; }
          
          .road-centerline { stroke: #f1c40f; opacity: 0.7; }

          .building-block { fill: #dcdcdc; stroke: #c0c0c0; filter: url(#building-shadow); }
          .dark .building-block { fill: #95a5a6; stroke: #7f8c8d; }

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
        <rect width="300" height="180" fill="url(#ground-pattern)" opacity="0.5" />

        {/* Features */}
        <path d="M 180,0 C 160,50 200,80 170,120 L 190,180 H 220 C 230,130 190,60 210,0 Z" className="water-area" />
        <path d="M 0,0 L 80,0 C 60,30 90,60 70,90 L 0,110 Z" className="park-area" />
        <circle cx="150" cy="140" r="30" className="park-area" />

        {/* Roads */}
        <g strokeWidth="8" className="road-casing">
          <path d="M 0,120 Q 150,130 300,90" fill="none"/>
          <path d="M 120,0 V 180" fill="none"/>
        </g>
        <g strokeWidth="6" className="road-fill">
          <path d="M 0,120 Q 150,130 300,90" fill="none"/>
          <path d="M 120,0 V 180" fill="none"/>
        </g>
        <path d="M 0,120 Q 150,130 300,90" strokeDasharray="4 4" strokeWidth="0.7" className="road-centerline" fill="none"/>
        
        {/* Secondary roads */}
        <path d="M 40,60 H 180" strokeWidth="4" className="road-secondary-fill road-casing" fill="none"/>
        <path d="M 40,60 H 180" strokeWidth="3" className="road-secondary-fill" fill="none"/>
        <path d="M 250,40 V 150" strokeWidth="4" className="road-secondary-fill road-casing" fill="none"/>
        <path d="M 250,40 V 150" strokeWidth="3" className="road-secondary-fill" fill="none"/>
        
        {/* Route Line */}
        {showRoute && pins.length > 1 && (
          <path
            d={`M ${pins.map(p => `${p.x},${p.y}`).join(' L ')}`}
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="2"
            strokeDasharray="5 3"
            markerEnd="url(#arrowhead)"
            style={{ filter: 'url(#drop-shadow)' }}
          />
        )}

        {/* Buildings */}
        <g className="building-block" strokeWidth="0.5">
          <rect x="10" y="10" width="30" height="25" rx="1" transform="rotate(5 25 22.5)" />
          <rect x="45" y="15" width="40" height="30" rx="1" />
          <rect x="10" y="130" width="80" height="35" rx="2" />
          <rect x="135" y="10" width="35" height="60" rx="1" />
          <rect x="135" y="80" width="25" height="25" rx="1" />
          <rect x="230" y="5" width="45" height="25" rx="1" />
          <rect x="260" y="155" width="35" height="20" rx="1" />
        </g>
        
        {/* Pins */}
        {sortedPins.map((pin, index) => {
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
            // FIX: Replaced <a> with <g> for SVG compatibility and added accessibility attributes.
            <g
              key={pin.id || index}
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
