import React, { type ForwardRefExoticComponent, type RefAttributes } from 'react';
import { type LatLngExpression, Marker, type MarkerOptions } from 'leaflet';

interface RotatedMarkerOptions extends MarkerOptions {
    rotationAngle?: number;
    rotationOrigin?: string;
    keepAtCenter?: boolean;
    isFollow?: boolean;
    onClick?: (e: MouseEvent) => void
}

type RotatedMarkerProps = RotatedMarkerOptions & {
    position: LatLngExpression;
    children?: React.ReactNode;
}

declare class RotatedMarkerElement extends Marker {
    constructor(position: LatLngExpression, options: RotatedMarkerOptions);
    declare options: RotatedMarkerOptions;
    setRotationOrigin(newOrigin: string): void;
}

declare const RotatedMarker: ForwardRefExoticComponent<RotatedMarkerProps & RefAttributes<RotatedMarkerElement>>;

export { RotatedMarker, type RotatedMarkerElement as RotatedMarkerElement, RotatedMarkerOptions as RotatedMarkerOptions };