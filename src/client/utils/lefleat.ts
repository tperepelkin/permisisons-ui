import { LatLngLiteral, LatLng, LatLngTuple } from 'leaflet';

export function isLatLngLiteral(object: any): object is LatLng {
    return (
        (object as LatLng).lat !== undefined
        && (object as LatLng).lng !== undefined
        && (object as LatLng).constructor === undefined
    );
}

export function isLatLng(object: any): object is LatLngLiteral {
    return (
        (object as LatLng).lat !== undefined
        && (object as LatLng).lng !== undefined
        && (object as LatLng).constructor !== undefined
    );
}

export function isLatLngTuple(object: any): object is LatLngTuple {
    return (object as LatLngTuple) instanceof Array<number> && (object as LatLngTuple).length === 2;
}
