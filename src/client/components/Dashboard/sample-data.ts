import moment from "moment";
import { Person } from "./Users";
import { useConfirmDialog } from '../ConfirmDialog/useConfirmDialog';
import { MRT_Row } from "material-react-table";
import { Organization } from "./Organizations";

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
export function createData(
  id: number,
  name: string,
  inn: string,
  ogrn: string,
  ogrnCreateDate: string
): Organization {
  return { id, name, inn, ogrn, ogrnCreateDate, };
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
  createData(
    0,
    'АО "ФК "Зенит"',
    '7812005788',
    '1027810329095',
    moment('20.12.2002', 'YYYY.mm.dd').format('DD.mm.YYYY')
  ),
  createData(
    1,
    'БФ ФНБУ "Иорспасслужба"',
    '7722005788',
    '2222810329095',
    moment('20.12.2020', 'YYYY.mm.dd').format('DD.mm.YYYY')
  ),
  createData(
    2,
    'Войсковая часть 09436',
    '7112235788',
    '1127810329095',
    moment('20.12.1992', 'YYYY.mm.dd').format('DD.mm.YYYY')
  ),
];
