import React, { useEffect } from 'react';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import { Map } from 'leaflet';
import { useMap } from 'react-leaflet';

const SearchFieldComponent = (): React.ReactElement => {
    const provider = new OpenStreetMapProvider();
    const map: Map = useMap();
    const search = new (GeoSearchControl as any)({
        provider,
        style: 'bar',
        'accept-language': 'ru',
        countrycodes: 'ru',
        classNames: {
            form: 'search-form',
            input: 'search-button',
        }
    });

    useEffect(() => {
        map.addControl(search);
        return () => {
            map.removeControl(search);
        }
    }, []);

    return null;
}

export default SearchFieldComponent;