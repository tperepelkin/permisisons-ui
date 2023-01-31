import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-leaflet';
import { RootState } from '../../store/rootReducer';
import selectIcon from '../../utils/flyIcons';
import { RotatedMarker } from '../RotatedMarker';
import { modalsSlice } from '../../store/slices/modals.slice';
import { SourceType } from '../../interfaces/sources';

import './SourcesMarkers.scss';

const AdsbMarkers = (): React.ReactElement => {
    const sourceType: SourceType = SourceType.adsb;

    const adsbList = useSelector((state: RootState) => state.map.adsbList);
    const adsbGroupsToggler = useSelector((state: RootState) => state.map.adsbGroupsToggler);
    const selectedMarker = useSelector((state: RootState) => state.modals.infoPanelRecord);

    const dispatch = useDispatch();

    // console.log('Selected marker',
    //     selectedMarker?.latitude, selectedMarker?.longitude, selectedMarker?.altitude
    // );

    return (
        <>
            {adsbList
                .filter(it => adsbGroupsToggler[it.sacSic] === true)
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
                            key={`adsb-marker-${it.targetNumber}`}
                            icon={selectIcon(it.planeType)}
                            position={[it.latitude, it.longitude]}
                            rotationAngle={it.courseAngle}
                            onClick={e => {
                                console.log(it.latitude, it.longitude, it.altitude);
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

export default AdsbMarkers;