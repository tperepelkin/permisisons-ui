import L, { Icon } from 'leaflet';
import noCategory from '../assets/image-markers/triangle.svg';
import mlat from '../assets/image-markers/triangle-mlat.svg';
import psr from '../assets/image-markers/triangle-psr.svg';
import lightAircraft from '../assets/image-markers/lightAircraft.png';
import smallAircraft from '../assets/image-markers/smallAircraft.png';
import mediumAircraft from '../assets/image-markers/mediumAircraft.svg';
import highVortexLargeAircraft from '../assets/image-markers/highVortexLargeAircraft.svg';
import largeAircraft from '../assets/image-markers/largeAircraft.png';
import highlyManoeuvrableAircraft from '../assets/image-markers/highlyManoeuvrableAircraft.svg';
import rotorAircraft from '../assets/image-markers/rotorAircraft.svg';
import gliderAircraft from '../assets/image-markers/gliderAircraft.png';
import lighterThanAircraft from '../assets/image-markers/lighterThanAircraft.png';
import unmannedAerialVehicleAircraft from '../assets/image-markers/unmannedAerialVehicleAircraft.svg';
import spaceAircraft from '../assets/image-markers/spaceAircraft.png';
import ultralightAircraft from '../assets/image-markers/ultralightAircraft.png';
import parachutist from '../assets/image-markers/parachutist.png';
import emergencyCar from '../assets/image-markers/emergencyCar.png';
import serviceCar from '../assets/image-markers/serviceCar.png';

const flyIcons: { [key: string]: Icon } = {
  noCategory: L.icon({
    iconSize: [20, 20],
    iconAnchor: [14, 14],
    tooltipAnchor: [0, 0],
    iconUrl: noCategory,
  }),

  mlatAircraft: L.icon({
    iconSize: [20, 20],
    iconAnchor: [14, 14],
    tooltipAnchor: [0, 0],
    iconUrl: mlat,
  }),

  psrAircraft: L.icon({
    iconSize: [20, 20],
    iconAnchor: [14, 14],
    tooltipAnchor: [0, 0],
    iconUrl: psr,
  }),

  lightAircraft: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: lightAircraft,
  }),

  smallAircraft: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: smallAircraft,
  }),

  mediumAircraft: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: mediumAircraft,
  }),

  highVortexLargeAircraft: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: highVortexLargeAircraft,
  }),

  largeAircraft: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: largeAircraft,
  }),

  highlyManoeuvrableAircraft: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: highlyManoeuvrableAircraft,
  }),

  reserved7: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: '',
  }),

  reserved8: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: '',
  }),

  reserved9: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: '',
  }),

  rotorAircraft: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: rotorAircraft,
  }),

  gliderAircraft: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: gliderAircraft,
  }),

  lighterThanAircraft: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: lighterThanAircraft,
  }),

  unmannedAerialVehicleAircraft: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: unmannedAerialVehicleAircraft,
  }),

  spaceAircraft: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: spaceAircraft,
  }),

  ultralightAircraft: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: ultralightAircraft,
  }),

  parachutist: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: parachutist,
  }),

  reserved17: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: '',
  }),

  reserved18: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: '',
  }),

  reserved19: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: '',
  }),

  emergencyCar: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: emergencyCar,
  }),

  serviceCar: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: serviceCar,
  }),

  obstruction: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: '',
  }),

  clusterObstruction: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: '',
  }),

  lienObstruction: L.icon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, 0],
    iconUrl: '',
  }),
};

const selectIcon = (emitterType: number): Icon => {
  let icon;
  switch (emitterType) {
    case 1:
      icon = flyIcons.lightAircraft;
      break;
    case 2:
      icon = flyIcons.smallAircraft;
      break;
    case 3:
      icon = flyIcons.mediumAircraft;
      break;
    case 4:
      icon = flyIcons.highVortexLargeAircraft;
      break;
    case 5:
      icon = flyIcons.largeAircraft;
      break;
    case 6:
      icon = flyIcons.highlyManoeuvrableAircraft;
      break;
    case 7:
      icon = flyIcons.reserved7;
      break;
    case 8:
      icon = flyIcons.reserved8;
      break;
    case 9:
      icon = flyIcons.reserved9;
      break;
    case 10:
      icon = flyIcons.rotorAircraft;
      break;
    case 11:
      icon = flyIcons.gliderAircraft;
      break;
    case 12:
      icon = flyIcons.lighterThanAircraft;
      break;
    case 13:
      icon = flyIcons.unmannedAerialVehicleAircraft;
      break;
    case 14:
      icon = flyIcons.spaceAircraft;
      break;
    case 15:
      icon = flyIcons.ultralightAircraft;
      break;
    case 16:
      icon = flyIcons.parachutist;
      break;
    case 17:
      icon = flyIcons.reserved17;
      break;
    case 18:
      icon = flyIcons.reserved18;
      break;
    case 19:
      icon = flyIcons.reserved19;
      break;
    case 20:
      icon = flyIcons.emergencyCar;
      break;
    case 21:
      icon = flyIcons.serviceCar;
      break;
    case 22:
      icon = flyIcons.obstruction;
      break;
    case 23:
      icon = flyIcons.clusterObstruction;
      break;
    case 24:
      icon = flyIcons.lienObstruction;
      break;
    default:
      icon = flyIcons.noCategory;
      break;
  }

  return icon;
};

export { flyIcons };

export default selectIcon;
