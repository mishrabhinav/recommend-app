import {
  SET_LOCATION
} from './constants';

export function setLocation(lat, lng, locationType) {
  return {
    type: SET_LOCATION,
    lat,
    lng,
    locationType
  };
}
