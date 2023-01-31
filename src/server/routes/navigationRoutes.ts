import * as express from 'express';
import {Server, Path, GET, PathParam} from "typescript-rest";

import { IAdsbClientData } from "../datasources/interfaces/IAdsbClientData";
import { IMlatClientData } from "../datasources/interfaces/IMlatClientData";
import { IPsrClientData } from "../datasources/interfaces/IPsrClientData";
import { lastSqlData } from '../datasources/sql/scheduler';
import { lastFileData } from '../datasources/file/scheduler';
import { IAirFieldData } from '../datasources/interfaces/IAirfieldData';
import { IZoneData } from '../datasources/interfaces/IZoneData';

const router = express.Router();

// @Path('/navigation/adsb')
router.get('/navigation/adsb', async (req, res, next) => {
    const result: Array<IAdsbClientData> = lastSqlData.adsb;
    res.json(result);
});

router.get('/navigation/mlat', async (req, res, next) => {
    const result: Array<IMlatClientData> = lastSqlData.mlat;
    res.json(result);
});

router.get('/navigation/psr', async (req, res, next) => {
    const result: Array<IPsrClientData> = lastSqlData.psr;
    res.json(result);
});

router.get('/navigation/airdromes', async (req, res, next) => {
    const result: Array<IAirFieldData> = lastFileData.airdromes;
    res.json(result);
});
router.get('/navigation/zones', async (req, res, next) => {
    const result: Array<IZoneData> = lastFileData.zones;
    res.json(result);
});

export default router;