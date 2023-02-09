import moment from "moment";
import { Person } from "./Users";
import { Organization } from "./Organizations";
import { Aircraft } from "./Aircrafts";
import { UnmannedAircraft } from "./UnmannedAircrafts";

export function validateRequired(value: string) {
  return !!value.length;
}

function createPerson(
  id: number,
  lastName: string,
  firstName: string,
  patronimyc: string,
  passportSeries: number,
  passportNumber: number,
): Person {
  return { id, lastName, firstName, patronimyc, passportSeries, passportNumber, };
}

// Generate Order Data
export function createOrganization(
  id: number,
  name: string,
  inn: string,
  ogrn: string,
  ogrnCreateDate: string
): Organization {
  return { id, name, inn, ogrn, ogrnCreateDate, };
}

export function createAircraft(
  id: number,
  name: string,
  registrationNumber: string,
  factoryNumber: string,
): Aircraft {
  return { id, name, registrationNumber, factoryNumber, };
}

export function createUnmannedAircraft(
  id: number,
  typeName: string,
  serialNumber: string,
  registrationNumber: string,
  owner: string,
  maxTakeoffWeight: number,
  registrationDate: string | null,
): UnmannedAircraft {
  return { id, typeName, serialNumber, registrationNumber, owner, maxTakeoffWeight, registrationDate, };
}

export const personSampleList = [
  createPerson(
    0,
    'Головкова',
    'Марина',
    'Алексеевна',
    2030,
    231908,
  ),
  createPerson(
    1,
    'Воронец',
    'Сергей',
    'Васильевич',
    1134,
    531908,
  ),
  createPerson(
    2,
    'Голосин',
    'Николай',
    'Александрович',
    4030,
    970755,
  ),
  createPerson(
    3,
    'Голяшов',
    'Евгений',
    'Викторович',
    1230,
    731907,
  ),

  createPerson(
    4,
    'Иванов',
    'Василий',
    'Иванович',
    1231,
    232908,
  ),
];

export const organizationSampleList = [
  createOrganization(
    0,
    'АО "ФК "Зенит"',
    '7812005788',
    '1027810329095',
    moment('20.12.2002', 'YYYY.mm.dd').format('DD.mm.YYYY')
  ),
  createOrganization(
    1,
    'БФ ФНБУ "Иорспасслужба"',
    '7722005788',
    '2222810329095',
    moment('20.12.2020', 'YYYY.mm.dd').format('DD.mm.YYYY')
  ),
  createOrganization(
    2,
    'Войсковая часть 09436',
    '7112235788',
    '1127810329095',
    moment('20.12.1992', 'YYYY.mm.dd').format('DD.mm.YYYY')
  ),
];

export const aircraftSampleList = [
  createAircraft(
    0,
    'Ka-52',
    'RF-32803',
    '32382612007',
  ),
  createAircraft(
    1,
    'Ka-52',
    'RF-90388',
    '9827',
  ),
  createAircraft(
    2,
    'Аэростат тепловой АТ104/80ТА',
    'RA-2472G',
    '940415',
  ),
  createAircraft(
    3,
    'Аэростат тепловой класса АХ-8',
    'RA-2470G',
    'ЕСВС.03.2211',
  ),
  createAircraft(
    4,
    'Ka-52',
    'RF-32805',
    '32382611002',
  ),
];

export const unmannedAircraftSampleList = [
  createUnmannedAircraft(
    0,
    'DJI Mavic 2 Pro',
    '163DFBS001595Z',
    '0j30953',
    'Василий Иванович Чапаев',
    0.907,
    moment('2022.12.20', 'YYYY.mm.dd').format('DD.mm.YYYY'),
  ),
  createUnmannedAircraft(
    1,
    'DJI Mavic 2 Pro',
    '152BFBS001595Z',
    '0j20953',
    'Иван Иванович Иванов',
    0.907,
    null,
  ),
  createUnmannedAircraft(
    2,
    'DJI Mavic Air',
    'OK3DFBS001595EV',
    '00z30983',
    'Ломоносов Михайло Васильевич',
    0.43,
    null,

  ),
];