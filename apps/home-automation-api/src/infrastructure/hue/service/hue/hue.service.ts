import { Injectable } from '@nestjs/common';
import { HaaLogger } from 'apps/home-automation-api/src/common/logger/haa-logger';

@Injectable()
export class HueService {
  private readonly logger = new HaaLogger(HueService.name);

  // constructor(private hueLightService: HueLightService) {}

  // async getLights(hubBo: HubBo) {
  //   this.logger.debug(``, this.getLights.name);
  //   const results = await this.hueLightService.getAllLights({
  //     ipAddress: hubBo.ipAddress,
  //     username: hubBo.user?.username,
  //   });

  //   return results;
  // }

  // async updateLightState(
  //   lightBo: LightBo,
  //   lightStateBo: LightStateBo
  // ): Promise<LightBo> {
  //   this.logger.debug(
  //     `lightBo: ${JSON.stringify(lightBo)} lightStateBo: ${JSON.stringify(
  //       lightStateBo
  //     )}`,
  //     this.updateLightState.name
  //   );

  //   const authenticationDto = {
  //     ipAddress: lightBo.hub.ipAddress,
  //     username: lightBo.hub.user?.username,
  //   };

  //   const updateLightStateDto = HueLightMapper.toStateDto(lightStateBo);

  //   const readLightDto = await this.hueLightService.updateLightState(
  //     lightBo.lightId,
  //     updateLightStateDto,
  //     authenticationDto
  //   );

  //   return HueLightMapper.toBo(readLightDto, lightBo.hub);
  // }
}
