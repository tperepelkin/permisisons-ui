import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-leaflet';
import { RootState } from '../../store/rootReducer';
import { flyIcons } from '../../utils/flyIcons';
import { RotatedMarker } from '../RotatedMarker';
import { modalsSlice } from '../../store/slices/modals.slice';
import { SourceType } from '../../interfaces/sources';

import './SourcesMarkers.scss';

const PsrMarkers = (): React.ReactElement => {
    const sourceType: SourceType = SourceType.psr;

    const psrList = useSelector((state: RootState) => state.map.psrList);
    const psrGroupsToggler = useSelector((state: RootState) => state.map.psrGroupsToggler);
    const dispatch = useDispatch();
    return (

        <>
            {psrList
                .filter(it => psrGroupsToggler[it.sacSic] === true)
                .map(it => {
                    let title = `Транспондер: ${it.targetNumber}`;

                    return (
                        <RotatedMarker
                            key={`psr-marker-${it.targetNumber}`}
                            icon={flyIcons.psrAircraft}
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

export default PsrMarkers;