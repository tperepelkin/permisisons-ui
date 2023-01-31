export enum SourceType {
    adsb = 'adsb',
    mlat = 'mlat',
    psr = 'psr',
};

export type SourceKey = keyof typeof SourceType;