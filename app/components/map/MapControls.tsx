import React from 'react';

interface MapControlsProps {
  zoomLevel: number;
  isInteractive: boolean;
  onZoomChange: (newZoom: number) => void;
  onInteractionToggle: () => void;
}

const MapControls: React.FC<MapControlsProps> = ({
  zoomLevel,
  isInteractive,
  onZoomChange,
  onInteractionToggle,
}) => {
  return (
    <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg">
      <div className="mb-4">
        <label htmlFor="zoom" className="block text-sm font-medium text-gray-700">
          Zoom Level: {zoomLevel}
        </label>
        <input
          type="range"
          id="zoom"
          min="1"
          max="18"
          value={zoomLevel}
          onChange={(e) => onZoomChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <div>
        <label htmlFor="interactive" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              id="interactive"
              className="sr-only"
              checked={isInteractive}
              onChange={onInteractionToggle}
            />
            <div className={`block w-14 h-8 rounded-full ${isInteractive ? 'bg-green-400' : 'bg-gray-400'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isInteractive ? 'transform translate-x-6' : ''}`}></div>
          </div>
          <div className="ml-3 text-gray-700 font-medium">
            Interactive Mode
          </div>
        </label>
      </div>
    </div>
  )
};

export default MapControls;
