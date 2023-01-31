interface IVNIIRAFilesConfig {
    directory: string;
    files: { [key in string]: string };
}

export const VNIIRAFilesConfig: IVNIIRAFilesConfig = {
    directory: '/home/ngolosin/projects/webMonitoring/resources/files',
    files: {
        ardCapability: 'ARD_CAPABILITY.txt',
        airdromes: 'AIRDROMES.txt',
        airways: 'AIRWAYS.txt',
        airwayNames: 'AIRWAY_NAMES.txt',
        zone: 'ZONE_NAME.txt',
        zoneBoundary: 'ZONE_BOUNDARY.txt',
        zonePoints: 'ZONE_POINTS.txt',
        mvlAirways: 'MVL_AIRWAYS.txt',
        mvlPoints: 'MVL_POINTS.txt',
    }
}