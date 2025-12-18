
import { Module } from "@nestjs/common";
import { HueApiModule } from "./hue-api/hue-api.module";

@Module({
  imports: [HueApiModule],
  exports: [HueApiModule]
})
export class InfrastructureModule {}
