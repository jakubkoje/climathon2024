export interface GeocodeResult {
    lat: number;
    lon: number;
}

export async function geocodeAddress(address: string, postalCode: string): Promise<GeocodeResult> {
    const accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
    const query = encodeURIComponent(`${address}, ${postalCode}, Bratislava, Slovakia`);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${accessToken}&limit=1`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Geocoding request failed');
        }
        const data = await response.json();

        if (data.features && data.features.length > 0) {
            const feature = data.features[0];
            const [lon, lat] = feature.center as [number, number];
            return { lat, lon };
        } else {
            throw new Error('Location not found');
        }
    } catch (error) {
        throw new Error('Geocoding failed');
    }
}