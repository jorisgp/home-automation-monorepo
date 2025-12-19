export enum IdParam {
  HUB_ID = ':hubId',
  LIGHT_ID = ':lightId',
  STATE_ID = ':stateId',
}
export enum IdParamUrl {
  HUB_ID = ':' + IdParam.HUB_ID,
  LIGHT_ID = ':' + IdParam.LIGHT_ID,
  STATE_ID = ':' + IdParam.STATE_ID,
}
