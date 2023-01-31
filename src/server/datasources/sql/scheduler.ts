import { AdsbTransformer } from './transformers/adsbTransformer';
import { IAdsbClientData } from "../interfaces/IAdsbClientData";
import { MlatTransformer } from './transformers/mlatTransformer';
import { IMlatClientData } from "../interfaces/IMlatClientData";
import { IPsrClientData } from "../interfaces/IPsrClientData";
import { PsrTransformer } from './transformers/psrTransformer';
import Adsb from '../../database/models/ads_b';
import Mlat from '../../database/models/mlat';
import Psr from '../../database/models/psr';
import TimeScheduler from '../../services/timeScheduler';

type ILastSqlData = {
    adsb: Array<IAdsbClientData>;
    mlat: Array<IMlatClientData>;
    psr: Array<IPsrClientData>;
};

export const lastSqlData: ILastSqlData = {
    adsb: [],
    mlat: [],
    psr: [],
};

class SqlScheduler {
    constructor() {
        const scheduler = TimeScheduler.getInstance();
        scheduler.addJob("checkSqlTables", "* * * * * *", async () => {
            let dbAdsbResult = await Adsb.findAll();
            const adsbResult: Array<IAdsbClientData> = dbAdsbResult.map(it => AdsbTransformer.transform(it.get({ plain: true })));
            lastSqlData.adsb = adsbResult;

            const dbMlatResult = await Mlat.findAll();
            const mlatResult: Array<IMlatClientData> = dbMlatResult.map(it => MlatTransformer.transform(it.get({ plain: true })));
            lastSqlData.mlat = mlatResult;

            const dbPsrResult = await Psr.findAll();
            const psrResult: Array<IPsrClientData> = dbPsrResult.map(it => PsrTransformer.transform(it.get({ plain: true })));
            lastSqlData.psr = psrResult;
        });
    }
};

export default SqlScheduler;