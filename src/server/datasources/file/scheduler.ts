import TimeScheduler from '../../services/timeScheduler';
import { IAirFieldData } from "../interfaces/IAirfieldData";
import { AirdromeTransformer } from "./transformers/airdromes";
import Airfield, { IAirfieldTableAttributes } from "../../database/models/airfield";
import { VNIIRAFilesConfig } from './IVNIIRAFilesConfig';
import { checkFile, updateFileInfo, loadContent } from './utils';
import { Attributes, BulkCreateOptions, CreationAttributes, DestroyOptions, ModelStatic } from 'sequelize';
import { Model } from 'sequelize-typescript';
import Zone, { IZoneAttributes } from '../../database/models/zone';
import { IZoneData } from '../interfaces/IZoneData';
import { ZoneTransformer } from './transformers/zone';
import ZoneBoundary, { IZoneBoundaryAttributes } from '../../database/models/zoneBoundary';
import { ZoneBoundariesTransformer } from './transformers/zoneBoundaries';
import { ZonePointsTransformer } from './transformers/zonePoints';
import { IZoneBoundaryData } from '../interfaces/IZoneBoundaryData';
import ZonePoint, { IZonePointAttributes } from '../../database/models/zonePoint';
import { IZonePointData } from '../interfaces/IZonePointData';

type ILastFileData = {
    airdromes: Array<IAirFieldData>;
    zones: Array<IZoneData>;
};

export const lastFileData: ILastFileData = {
    airdromes: [],
    zones: [],
};

const processAirdromes = async (
    dir: string
    , filename: string
    , bulkCreate: <M extends Model>(
        records: ReadonlyArray<CreationAttributes<M>>,
        options?: BulkCreateOptions<Attributes<M>>
    ) => Promise<Model<any, any>[]>
    , destroy: <M extends Model>(
        options?: DestroyOptions<Attributes<M>>
    ) => Promise<number>
): Promise<void> => {
    console.log('Проверка существования файла аэродромов');

    const checkFileResult = await checkFile(dir, filename);
    if (!checkFileResult) {
        return;
    }

    console.log('Проверка обновлений для файла аэродромов');

    const shouldUpdateResult = await updateFileInfo(dir, filename);
    if (shouldUpdateResult) {
        console.log('Файла аэродромов обновлён');

        const filePath = `${dir}/${filename}`;
        const transformer = new AirdromeTransformer();

        console.log('Загрузка файла аэродромов в базу');
        await loadContent<IAirfieldTableAttributes, IAirFieldData>(
            filePath
            , FileScheduler.airdromeTransformer.transformToDbModel
            , FileScheduler.airdromeTransformer.transformToClientModel
            , bulkCreate
            , destroy
        );

    }

    console.log('Загрузка файлов аэродромов успешно завершена');
};

const processZones = async (
    dir: string
    , filename: string
    , bulkCreate: <M extends Model>(
        records: ReadonlyArray<CreationAttributes<M>>,
        options?: BulkCreateOptions<Attributes<M>>
    ) => Promise<M[]>
    , destroy: <M extends Model>(
        options?: DestroyOptions<Attributes<M>>
    ) => Promise<number>
): Promise<void> => {
    console.log('Проверка существования файла зон');

    const checkFileResult = await checkFile(dir, filename);
    if (!checkFileResult) {
        return;
    }

    console.log('Проверка обновлений для файла зон');

    const shouldUpdateResult = await updateFileInfo(dir, filename);
    if (shouldUpdateResult) {
        console.log('Файла зон обновлён');

        const filePath = `${dir}/${filename}`;

        console.log('Загрузка файла зон в базу');

        await loadContent<IZoneData, IZoneAttributes>(
            filePath
            , FileScheduler.zoneTransformer.transformToDbModel
            , FileScheduler.zoneTransformer.transformToClientModel
            , bulkCreate
            , destroy
        );
    }

    console.log('Загрузка файлов зон успешно завершена');
};

const processZoneBoundaries = async (
    dir: string
    , filename: string
    , bulkCreate: <M extends Model>(
        records: ReadonlyArray<CreationAttributes<M>>,
        options?: BulkCreateOptions<Attributes<M>>
    ) => Promise<M[]>
    , destroy: <M extends Model>(
        options?: DestroyOptions<Attributes<M>>
    ) => Promise<number>
): Promise<void> => {
    console.log('Проверка существования файла границ зон');

    const checkFileResult = await checkFile(dir, filename);
    if (!checkFileResult) {
        return;
    }

    console.log('Проверка обновлений для файла границ зон');

    const shouldUpdateResult = await updateFileInfo(dir, filename);
    if (shouldUpdateResult) {
        console.log('Файла границ зон обновлён');

        const filePath = `${dir}/${filename}`;

        console.log('Загрузка файла границ зон в базу');

        await loadContent<IZoneBoundaryAttributes, IZoneBoundaryData>(
            filePath
            , FileScheduler.zoneBoundaryTransformer.transformToDbModel
            , FileScheduler.zoneBoundaryTransformer.transformToClientModel
            , bulkCreate
            , destroy
        );
    }

    console.log('Загрузка файлов границ зон успешно завершена');
};

const processZonePoints = async (
    dir: string
    , filename: string
    , bulkCreate: <M extends Model>(
        records: ReadonlyArray<CreationAttributes<M>>,
        options?: BulkCreateOptions<Attributes<M>>
    ) => Promise<M[]>
    , destroy: <M extends Model>(
        options?: DestroyOptions<Attributes<M>>
    ) => Promise<number>
): Promise<void> => {
    console.log('Проверка существования файла точек границ зон');

    const checkFileResult = await checkFile(dir, filename);
    if (!checkFileResult) {
        return;
    }

    console.log('Проверка обновлений для файла точек границ зон');

    const shouldUpdateResult = await updateFileInfo(dir, filename);
    if (shouldUpdateResult) {
        console.log('Файла границ зон обновлён');

        const filePath = `${dir}/${filename}`;

        console.log('Загрузка файла точек границ зон в базу');

        await loadContent<IZonePointAttributes, IZonePointData>(
            filePath
            , FileScheduler.zonePointTransformer.transformToDbModel
            , FileScheduler.zonePointTransformer.transformToClientModel
            , bulkCreate
            , destroy
        );
    }

    console.log('Загрузка файлов точек границ зон успешно завершена');
};

class FileScheduler {
    static airdromeTransformer = new AirdromeTransformer();
    static zoneTransformer = new ZoneTransformer();
    static zoneBoundaryTransformer = new ZoneBoundariesTransformer();
    static zonePointTransformer = new ZonePointsTransformer();

    constructor() {
        const scheduler = TimeScheduler.getInstance();
        const transformer = new AirdromeTransformer();
        scheduler.addJob("checkSqlTables", "*/5 * * * * *", async () => {
            console.log('Служба загрузки файлов');

            // Проверим, менялся ли файл аэродромов. Если менялся, загрузим в базу
            await processAirdromes(
                VNIIRAFilesConfig.directory
                , VNIIRAFilesConfig.files.airdromes
                , Airfield.bulkCreate.bind(Airfield)
                , Airfield.destroy.bind(Airfield)
            );

            await processZones(
                VNIIRAFilesConfig.directory
                , VNIIRAFilesConfig.files.zone
                , Zone.bulkCreate.bind(Zone)
                , Zone.destroy.bind(Zone)
            );

            await processZoneBoundaries(
                VNIIRAFilesConfig.directory
                , VNIIRAFilesConfig.files.zoneBoundary
                , Zone.bulkCreate.bind(ZoneBoundary)
                , Zone.destroy.bind(ZoneBoundary)
            );

            await processZonePoints(
                VNIIRAFilesConfig.directory
                , VNIIRAFilesConfig.files.zonePoints
                , Zone.bulkCreate.bind(ZonePoint)
                , Zone.destroy.bind(ZonePoint)
            );

            const dbAirdromes = await Airfield.findAll();
            const airdromes: Array<IAirFieldData> = dbAirdromes.map(it => FileScheduler.airdromeTransformer.transformToClientModel(it.get({ plain: true })));
            lastFileData.airdromes = airdromes;

            const dbZones = await Zone.scope('boundaries').findAll();
            const zones: Array<IZoneAttributes> = dbZones.map(it => FileScheduler.zoneTransformer.transformToClientModel(it.get({plain: true})));
            lastFileData.zones = zones;
        });
    }
};

export default FileScheduler;