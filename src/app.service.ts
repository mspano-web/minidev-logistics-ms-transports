import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { firstValueFrom } from 'rxjs';
import { Sequelize } from 'sequelize-typescript';
import { TransportBusinessEntity } from './business Entities/tranport.entity.business';
import {
  RsCreateTransportDto,
  RsDeleteTransportDto,
  RsGetTransportByZoneDto,
  RsGetTransportDto,
  RsUpdateTransportDto,
} from './dto';
import { Transportation } from './entities';
import { IRqRsFactory, RQ_RS_FACTORY_SERVICE } from './interfaces';

/* --------------------------------------------------------- */

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Transportation)
    private readonly transportModel: typeof Transportation,

    private sequelize: Sequelize,

    @Inject(RQ_RS_FACTORY_SERVICE)
    private readonly rqRsFactoryService: IRqRsFactory,

    @Inject('RABBIT_SERVICE_ZONES') private service_zone: ClientProxy,
  ) {}

  /* ---------------- */

  async findAll(): Promise<Transportation[]> {
    return await this.transportModel.findAll<Transportation>();
  }

  /* ---------------- */

  async create(
    newTransport: TransportBusinessEntity,
  ): Promise<RsCreateTransportDto> {
    let rsCreateTransportDto: RsCreateTransportDto;

    try {
      const rqGetZoneDto = this.rqRsFactoryService.createRQGetZone(
        newTransport.zone_id,
      );
      const zoneRes = await firstValueFrom(
        this.service_zone.send({ cmd: 'ms-get-zone-by-id' }, rqGetZoneDto),
      );

      if (zoneRes && zoneRes.rsGenericHeaderDto.statusCode === HttpStatus.OK) {
        const res = await this.transportModel.create<Transportation>({
          owner_name: newTransport.owner_name,
          vehicle_identification: newTransport.vehicle_identification,
          volume_capacity: newTransport.volume_capacity,
          weight_capacity: newTransport.weight_capacity,
          cellphone_number: newTransport.cellphone_number,
          zone_id: newTransport.zone_id,
        });

        if (res !== null && res.id) {
          rsCreateTransportDto =
            this.rqRsFactoryService.TransportEntitytoDTOCreateResponse(
              HttpStatus.CREATED,
              '',
              res.id,
            );
        } else {
          rsCreateTransportDto =
            this.rqRsFactoryService.TransportEntitytoDTOCreateResponse(
              HttpStatus.INTERNAL_SERVER_ERROR,
              'Create Transport Fail!',
              null,
            );
        }
      } else {
        rsCreateTransportDto =
          this.rqRsFactoryService.TransportEntitytoDTOCreateResponse(
            HttpStatus.FAILED_DEPENDENCY,
            'Invalid Zone',
            null,
          );
      }
    } catch (error) {
      rsCreateTransportDto =
        this.rqRsFactoryService.TransportEntitytoDTOCreateResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Create Transport Fail!',
          null,
        );
    }

    console.log( '[ms-transport-create][service] (', rsCreateTransportDto, ')' );
    return rsCreateTransportDto;
  }

  /* --------------------- */

  async findOne(id: number): Promise<RsGetTransportDto> {
    let rsGetTransportDto: RsGetTransportDto;

    try {
      const transportDB = await this.transportModel.findOne({
        where: {
          id,
        },
      });
      if (transportDB !== null) {
        rsGetTransportDto =
          this.rqRsFactoryService.TransportEntitytoDTOGetResponse(
            HttpStatus.OK,
            '',
            transportDB,
          );
      } else {
        rsGetTransportDto =
          this.rqRsFactoryService.TransportEntitytoDTOGetResponse(
            HttpStatus.NOT_FOUND,
            'Get Transport Not Found!',
            null,
          );
      }
    } catch (error) {
      rsGetTransportDto =
        this.rqRsFactoryService.TransportEntitytoDTOGetResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Get Transport Fail!',
          null,
        );
    }
    console.log( '[ms-get-transport][service] (', rsGetTransportDto, ')' );
    return rsGetTransportDto;
  }

  /* ---------------- */

  async remove(id: number): Promise<RsDeleteTransportDto> {
    let rsDeleteTransportDto: RsDeleteTransportDto;

    try {
      const transport = await this.transportModel.findOne({
        where: {
          id,
        },
      });
      await transport.destroy();
      rsDeleteTransportDto =
        this.rqRsFactoryService.TransportEntitytoDTODeleteResponse(
          HttpStatus.OK,
          '',
        );
    } catch (e) {
      rsDeleteTransportDto =
        this.rqRsFactoryService.TransportEntitytoDTODeleteResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Remove Transport Fail!',
        );
    }
    console.log( '[ms-delete-transport][service]  (', rsDeleteTransportDto, ')' );

    return rsDeleteTransportDto;
  }

  /* ---------------- */

  async update(
    id: number,
    transportBusinessEntity: TransportBusinessEntity,
  ): Promise<RsUpdateTransportDto> {
    let rsUpdateTransportDto: RsUpdateTransportDto;

    try {
      const rqGetZoneDto = this.rqRsFactoryService.createRQGetZone(
        transportBusinessEntity.zone_id,
      );
      const resZone = await firstValueFrom(
        this.service_zone.send({ cmd: 'ms-get-zone-by-id' }, rqGetZoneDto),
      );
      if (resZone) {
        await this.transportModel
          .update(transportBusinessEntity, {
            where: { id },
          })
          .then((result) => {
            if (result[0] === 0) {
              rsUpdateTransportDto =
                this.rqRsFactoryService.TransportEntitytoDTOUpdateResponse(
                  HttpStatus.INTERNAL_SERVER_ERROR,
                  'Update Transport Fail!',
                );
            } else {
              rsUpdateTransportDto =
                this.rqRsFactoryService.TransportEntitytoDTOUpdateResponse(
                  HttpStatus.OK,
                  '',
                );
            }
          });
      } else {
        rsUpdateTransportDto =
          this.rqRsFactoryService.TransportEntitytoDTOUpdateResponse(
            HttpStatus.FAILED_DEPENDENCY,
            'Invalid Zone',
          );
      }
    } catch (e) {
      rsUpdateTransportDto =
        this.rqRsFactoryService.TransportEntitytoDTOUpdateResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Update Transport Fail!',
        );
    }
    console.log( '[ms-update-transport][service]  (', rsUpdateTransportDto, ')' );

    return rsUpdateTransportDto;
  }

  /* ------------------- */

  async getTransportsByZone(zone_id: number): Promise<RsGetTransportByZoneDto> {
    let rsGetTransportByZoneDto: RsGetTransportByZoneDto;

    try {
      const result: Transportation[] = await this.transportModel.findAll({
        where: {
          zone_id: zone_id,
        },
      });

      if (result && result.length) {
        const tr: number[] = result.map((elem) => {
          return elem.id;
        });

        rsGetTransportByZoneDto =
          this.rqRsFactoryService.TransportEntitiestoDTOGetByZoneResponse(
            HttpStatus.OK,
            '',
            tr,
          );
      } else {
        rsGetTransportByZoneDto =
          this.rqRsFactoryService.TransportEntitiestoDTOGetByZoneResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            'Get By Zone Transport Fail!',
            null,
          );
      }
    } catch (e) {
      rsGetTransportByZoneDto =
        this.rqRsFactoryService.TransportEntitiestoDTOGetByZoneResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Get By Zone Transport Fail!',
          null,
        );
    }
    console.log( '[ms-get-transport-by-zone][service]  (', rsGetTransportByZoneDto, ')' );

    return rsGetTransportByZoneDto;
  }
}

/* --------------------------------------------------------- */