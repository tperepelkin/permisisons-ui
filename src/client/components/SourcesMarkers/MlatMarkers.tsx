import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-leaflet';
import { RootState } from '../../store/rootReducer';
import { flyIcons } from '../../utils/flyIcons';
import { RotatedMarker } from '../RotatedMarker';
import { modalsSlice } from '../../store/slices/modals.slice';
import { SourceType } from '../../interfaces/sources';
import { LatLng } from 'leaflet';
import { useMap } from 'react-leaflet';

import './SourcesMarkers.scss';

const MlatMarkers = (): React.ReactElement => {
    const sourceType: SourceType = SourceType.mlat;

    const mlatList = useSelector((state: RootState) => state.map.mlatList);
    const mlatGroupsToggler = useSelector((state: RootState) => state.map.mlatGroupsToggler);
    const dispatch = useDispatch();
    const map = useMap();

    return (
        <>
            {mlatList
                .filter(it => mlatGroupsToggler[it.sacSic] === true)
                .map(it => {
                    let title;
                    if (it.callSign) {
                        title = `Позывной: ${it.callSign}`;
                    } else if (it.icao) {
                        title = `ICAO: ${it.icao}`
                    } else {
                        title = `Транспондер: ${it.targetNumber}`;
                    }

                    return (
                        <RotatedMarker
                            key={`mlat-marker-${it.targetNumber}`}
                            icon={flyIcons.mlatAircraft}
                            position={[it.latitude, it.longitude]}
                            rotationAngle={it.courseAngle}
                            onClick={e => {
                                dispatch(modalsSlice.actions.setInfoPanelRecord({ record: it, type: sourceType }))
                                dispatch(modalsSlice.actions.toggleInfoPanel(true));
                            }}
                        >
                            <Tooltip className="marker-tooltip" permanent={true} direction="top" opacity={0.7}>
                                {title}
                            </Tooltip>
                        </RotatedMarker>
                    );
                })}
        </>
    );
}

export default MlatMarkers;