import { RsGenericHeaderDto } from "./rs-generic-header.dto";

/* ----------------------------------------- */

export class RsUpdateTransportDto {
    rsGenericHeaderDto: RsGenericHeaderDto;

    constructor(rsGenericHeaderDto: RsGenericHeaderDto) {
        this.rsGenericHeaderDto = rsGenericHeaderDto;
      }
}

/* ----------------------------------------- */
