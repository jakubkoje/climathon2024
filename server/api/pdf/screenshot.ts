import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { useRuntimeConfig } from '#imports';

export interface MapOptions {
    lon: number;
    lat: number;
    zoom: number;
    width?: number;
    height?: number;
    markers?: { lon: number; lat: number; color?: string }[];
    path?: { coordinates: [number, number][]; color?: string; weight?: number; opacity?: number };
}

// Helper function to create the URL for Mapbox API
const createMapboxUrl = ({ lon, lat, zoom, width = 600, height = 400, markers, path }: MapOptions): string => {
    const baseUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static`;
    const config = useRuntimeConfig();

    let markerPart = '';
    if (markers) {
        markerPart = markers.map(marker => `pin-s-${marker.color || 'FF0000'}(${marker.lon},${marker.lat})`).join(',');
    }

    let pathPart = '';
    if (path && path.coordinates.length > 0) {
        const color = path.color || 'FF0000';
        const weight = path.weight || 5;
        const opacity = path.opacity || 0.5;
        const coordinates = path.coordinates.map(coord => coord.join(',')).join(';');
        pathPart = `path-${weight}+${color}-${opacity}(${coordinates})`;
    }

    return `${baseUrl}/${markerPart}${pathPart ? `,${pathPart}` : ''}/${lon},${lat},${zoom}/${width}x${height}@2x?access_token=${config.public.mapbox.accessToken}`;
};

// Function to fetch and save the static map image
export const fetchAndSaveMapImage = async (options: MapOptions, fileName: string): Promise<void> => {
    const url = createMapboxUrl(options);

    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const filePath = path.resolve(__dirname, fileName);
        fs.writeFileSync(filePath, response.data, 'binary');
        console.log(`Map image saved to ${filePath}`);
    } catch (error) {
        console.error('Error fetching or saving map image:', error);
        throw error;
    }
};
