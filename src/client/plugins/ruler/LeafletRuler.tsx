import React from 'react';
import { useEffect } from "react";
import { useMap } from 'react-leaflet';
import L, { ControlOptions } from "leaflet";
import "./leaflet-ruler";

import "./leaflet-ruler.scss";

interface LeafletOptions {
    position?: string,
    circleMarker?: {
        color?: string,
        radius?: number
    },
    lineStyle?: {
        color?: string,
        dashArray?: string
    },
    lengthUnit?: {
        display?: string,
        decimal?: number,
        factor?: number | null,
        label?: string,
    },
    angleUnit?: {
        display?: string,
        decimal?: number,
        factor?: string | null,
        label?: string,
    },
}

const defaultOptions: LeafletOptions = {
    position: 'topright',
    circleMarker: {
        color: 'red',
        radius: 2
    },
    lineStyle: {
        color: 'red',
        dashArray: '1,6'
    },
    lengthUnit: {
        display: 'km',
        decimal: 2,
        factor: null,
        label: 'Distance:'
    },
    angleUnit: {
        display: '&deg;',
        decimal: 2,
        factor: null,
        label: 'Bearing:'
    }
};

interface LeafletRulerOptions extends ControlOptions {
    angleUnitLabel?: string;
    lengthUnitLabel?: string;
}

const LeafletRuler: React.FC<LeafletRulerOptions> = (props) => {
    const map = useMap();

    if (!map) {
        return null;
    }

    useEffect(() => {
        const { angleUnitLabel, lengthUnitLabel } = props;

        let newProps: LeafletOptions = Object.assign({}, defaultOptions, { position: props.position, });
        if (angleUnitLabel) {
            Object.assign({}, newProps.angleUnit, { label: angleUnitLabel });
        }

        if (lengthUnitLabel) {
            Object.assign({}, newProps.lengthUnit, { label: lengthUnitLabel });
        }

        const ruler = (L.control as any).ruler({
            ...newProps,

        });
        map.addControl(ruler);

        return () => {
            map.removeControl(ruler);
        }
    }, [map, props]);

    return (
        <></>
    );
}

export default LeafletRuler;