import { Injectable } from '@nestjs/common';

import { TransportBusinessEntity } from 'src/business Entities/tranport.entity.business';
import {
  RqCreateTransportDto,
  RqGetZoneDto,
  RqUpdateTransportDto,
  RsCreateTransportDto,
  RsDeleteTransportDto,
  RsGetTransportByZoneDto,
  RsGetTransportDto,
  RsUpdateTransportDto,
} from 'src/dto';
import { Transportation } from 'src/entities';
import { IRqRsFactory } from 'src/interfaces';

/* ------------------------------------------------------- */

@Injectable()
export class RqRsFactoryService implements IRqRsFactory {

  createTransportDTOToTransportBusinessEntity(
    rqCreateTransportDto: RqCreateTransportDto,
  ): TransportBusinessEntity {
    const tbe = new TransportBusinessEntity();
    tbe.cellphone_number = rqCreateTransportDto.cellphone_number;
    tbe.owner_name = rqCreateTransportDto.owner_name;
    tbe.vehicle_identification = rqCreateTransportDto.vehicle_identification;
    tbe.volume_capacity = rqCreateTransportDto.volume_capacity;
    tbe.weight_capacity = rqCreateTransportDto.weight_capacity;
    tbe.zone_id = rqCreateTransportDto.zone_id;

    return tbe;
  }

  /* ------------------- */

  createRQGetZone(id: number): RqGetZoneDto {
    return new RqGetZoneDto(id);
  }

  /* ------------------- */

  TransportEntitytoDTOCreateResponse(
    statusCode: number,
    message: string,
    id: number,
  ): RsCreateTransportDto {
    return new RsCreateTransportDto(
      { statusCode, message }, // header
      id // Check if user information is available
        ? {
            // add data
            id: id,
          }
        : null, // without data
    );
  }

  /* -------------- */
  
  TransportEntitytoDTODeleteResponse(
    statusCode: number,
    message: string,
  ): RsDeleteTransportDto {
    return new RsDeleteTransportDto({ statusCode, message });
  }

  /* -------------- */

  TransportEntitytoDTOGetResponse(
    statusCode: number,
    message: string,
    transportation: Transportation,
  ): RsGetTransportDto {
    return new RsGetTransportDto(
      { statusCode, message },
      {  
        owner_name: transportation.owner_name,
        vehicle_identification: transportation.vehicle_identification,
        volume_capacity: transportation.volume_capacity,
        weight_capacity: transportation.weight_capacity,
        cellphone_number: transportation.cellphone_number,
        zone_id: transportation.zone_id
      }
    );
  }

  /* -------------- */

  updateTransportDTOToTransportBusinessEntity(
    rqUpdateTransportDto: RqUpdateTransportDto,
  ): TransportBusinessEntity {
    const tbe = new TransportBusinessEntity();
    tbe.cellphone_number = rqUpdateTransportDto.cellphone_number;
    tbe.owner_name = rqUpdateTransportDto.owner_name;
    tbe.vehicle_identification = rqUpdateTransportDto.vehicle_identification;
    tbe.volume_capacity = rqUpdateTransportDto.volume_capacity;
    tbe.weight_capacity = rqUpdateTransportDto.weight_capacity;
    tbe.zone_id = rqUpdateTransportDto.zone_id;

    return tbe;
  }

  /* -------------- */
  
  TransportEntitytoDTOUpdateResponse(
    statusCode: number,
    message: string,
  ): RsUpdateTransportDto {
    return new RsUpdateTransportDto({ statusCode, message });
  }

    /* -------------- */

  TransportEntitiestoDTOGetByZoneResponse(
    statusCode: number,
    message: string,
    transportation: number[],
  ):RsGetTransportByZoneDto {
    return new RsGetTransportByZoneDto(
      { statusCode, message },
       transportation
    );

  }
}

/* ------------------------------------------------------- */
