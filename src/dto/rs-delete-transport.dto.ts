import { RsGenericHeaderDto } from './rs-generic-header.dto';

/* ----------------------------------------- */

export class RsDeleteTransportDto {
  rsGenericHeaderDto: RsGenericHeaderDto;

  constructor(rsGenericHeaderDto: RsGenericHeaderDto) {
    this.rsGenericHeaderDto = rsGenericHeaderDto;
  }
}

/* ----------------------------------------- */
