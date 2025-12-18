import { HubBo } from '../../hub/bo/hub.bo';
import { LightStateBo } from '../../state/bo/state.bo';

export class LightBo {
  id: string;
  lightId: string;
  name: string;
  hardwareId: string;
  type: string;
  modelid: string;
  manufacturerName: string;
  productName: string;
  state: LightStateBo;
  hub: HubBo;
}
