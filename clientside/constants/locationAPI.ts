const GOOGLE_LOCATION_API = `AIzaSyA4JVuWT38SfLvNhoGw8gyQZzFq06seZuU`;

export async function getAddress(lat: number, lng: number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_LOCATION_API}`
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Fail to fetch Address')
    }

    const data = await response.json();
    console.log(data);
    console.log(data.results);
    const address = data.results[0].formatted_address;
    return address
}