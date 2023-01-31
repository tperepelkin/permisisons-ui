import React from 'react';
import AdsbMarkers from "./AdsbMarkers";
import MlatMarkers from "./MlatMarkers";
import PsrMarkers from "./PsrMarkers";

const SourcesMarkers = () => {
    return (
        <>
            <AdsbMarkers />
            <MlatMarkers />
            <PsrMarkers />
        </>
    )
}

export default SourcesMarkers;