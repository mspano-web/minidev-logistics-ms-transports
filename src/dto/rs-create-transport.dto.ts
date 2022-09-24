import { RsGenericHeaderDto } from 'src/dto/rs-generic-header.dto';

/* ----------------------------------- */

export class RsCreateTransportDataDto {
  id: number;
}

/* ----------------------------------- */

export class RsCreateTransportDto {
  rsGenericHeaderDto: RsGenericHeaderDto;
  rsCreateTransportDataDto: RsCreateTransportDataDto;

  constructor(
    rsGenericHeaderDto: RsGenericHeaderDto,
    rsCreateTransportDataDto: RsCreateTransportDataDto,
  ) {
    this.rsGenericHeaderDto = rsGenericHeaderDto;
    this.rsCreateTransportDataDto = rsCreateTransportDataDto;
  }
}

/* ----------------------------------- */
