import { TransportBusinessEntity } from 'src/business Entities/tranport.entity.business';
import { RqCreateTransportDto, RqGetZoneDto, RqUpdateTransportDto, RsCreateTransportDto, RsDeleteTransportDto, RsGetTransportDto, RsUpdateTransportDto } from 'src/dto';
import { RsGetTransportByZoneDto } from 'src/dto/rs-get-transport-by-zone.dto';
import { Transportation } from 'src/entities';

//   interface and provide that token when injecting to an interface type.
export const RQ_RS_FACTORY_SERVICE = 'RQ_RS_FACTORY_SERVICE';

/* ---------------------------------------------------- */

export interface IRqRsFactory {

  createTransportDTOToTransportBusinessEntity(
    rsCreateTransportDto: RqCreateTransportDto,
  ): TransportBusinessEntity;

  /* --------------- */

  createRQGetZone(id: number): RqGetZoneDto;

  /* --------------- */
  
  TransportEntitytoDTOCreateResponse(
    statusCode: number,
    message: string,
    id: number,
  ): RsCreateTransportDto;

  /* --------------- */
  
  TransportEntitytoDTODeleteResponse(
    statusCode: number,
    message: string,
  ): RsDeleteTransportDto;

  /* --------------- */
  
  TransportEntitytoDTOGetResponse(
    statusCode: number,
    message: string,
    transportation: Transportation,
  ): RsGetTransportDto;

    /* --------------- */

  updateTransportDTOToTransportBusinessEntity(
    rqUpdateTransportDto: RqUpdateTransportDto,
  ): TransportBusinessEntity;

  /* --------------- */

  TransportEntitytoDTOUpdateResponse(
    statusCode: number,
    message: string,
  ): RsUpdateTransportDto;

  TransportEntitiestoDTOGetByZoneResponse(
    statusCode: number,
    message: string,
    transportation: number[],
  ):RsGetTransportByZoneDto;

  /* --------------- */

}

/* ---------------------------------------------------- */
