import axios from 'axios';

interface MapOptions {
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

    const config = useRuntimeConfig()

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

// Function to fetch the static map image from Mapbox
const fetchMapImage = async (options: MapOptions): Promise<string> => {
    const url = createMapboxUrl(options);

    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return Buffer.from(response.data, 'binary').toString('base64');
    } catch (error) {
        console.error('Error fetching map image:', error);
        throw error;
    }
};

// Example usage
export const exampleUsage = async () => {
    const options: MapOptions = {
        lon: -122.4194,
        lat: 37.7749,
        zoom: 12,
        markers: [{ lon: -122.4194, lat: 37.7749, color: '0000FF' }],
        path: {
            coordinates: [
                [-122.4194, 37.7749],
                [-122.4294, 37.7849]
            ],
            color: '00FF00',
            weight: 4,
            opacity: 0.6
        }
    };

    try {
        const base64Image = await fetchMapImage(options);
        console.log('Map image (base64):', base64Image);
        // You can now send this base64 image to the frontend or save it as a file
    } catch (error) {
        console.error('Failed to fetch map image:', error);
    }
};
