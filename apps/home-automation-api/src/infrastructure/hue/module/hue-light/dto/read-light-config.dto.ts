export class ReadLightConfigDto {
  archetype: string;
  function: string;
  direction: string;
  startup: {
    mode: string;
    configured: boolean;
  };
}
