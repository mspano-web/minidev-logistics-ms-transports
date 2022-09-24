import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AppService } from './app.service';
import { TransportBusinessEntity } from './business Entities/tranport.entity.business';
import {
  RqCreateTransportDto,
  RqDeleteTransportDto,
  RqGetTransporByZoneDto,
  RqGetTransportDto,
  RqUpdateTransportDto,
  RsCreateTransportDto,
  RsDeleteTransportDto,
  RsGetTransportByZoneDto,
  RsGetTransportDto,
  RsUpdateTransportDto,
} from './dto';
import { Transportation } from './entities';
import { IRqRsFactory, RQ_RS_FACTORY_SERVICE } from './interfaces';

/* --------------------------------------------------------- */

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,

    @Inject(RQ_RS_FACTORY_SERVICE)
    private readonly rqRsFactoryService: IRqRsFactory,
  ) {}

  /* --------------------- */

  @MessagePattern({ cmd: 'ms-transport-create' })
  async create(
    rqCreateTransportDto: RqCreateTransportDto,
  ): Promise<RsCreateTransportDto> {
    const transportBusinessData: TransportBusinessEntity =
      this.rqRsFactoryService.createTransportDTOToTransportBusinessEntity(
        rqCreateTransportDto,
      );

    return await this.appService.create(transportBusinessData);
  }

  /* --------------------- */

  @MessagePattern({ cmd: 'ms-get-transports' })
  async findAll(): Promise<Transportation[]> {
    return this.appService.findAll();
  }

  /* --------------------- */

  @MessagePattern({ cmd: 'ms-delete-transport' })
  async delete(
    rqDeleteTransportDto: RqDeleteTransportDto,
  ): Promise<RsDeleteTransportDto> {
    const { id } = rqDeleteTransportDto;
    return await this.appService.remove(id);
  }

  /* --------------------- */

  @MessagePattern({ cmd: 'ms-get-transport' })
  async getTransport(
    rqGetTransportDto: RqGetTransportDto,
  ): Promise<RsGetTransportDto> {
    const { id } = rqGetTransportDto;
    return await this.appService.findOne(id);
  }

  /* --------------------- */

  @MessagePattern({ cmd: 'ms-update-transport' })
  async updateTransport(params: {
    id: number;
    rqUpdateTransportDto: RqUpdateTransportDto;
  }): Promise<RsUpdateTransportDto> {
    const transportBusinessData: TransportBusinessEntity =
      this.rqRsFactoryService.updateTransportDTOToTransportBusinessEntity(
        params.rqUpdateTransportDto,
      );

    return this.appService.update(params.id, transportBusinessData);
  }

  /* --------------------- */

  @MessagePattern('ms-get-transport-by-zone')
  async getTransportsByZone(
    rqGetTransportByZoneDto: RqGetTransporByZoneDto,
  ): Promise<RsGetTransportByZoneDto> {
    const { zone_id } = rqGetTransportByZoneDto;
    return await this.appService.getTransportsByZone(zone_id);
  }
}

/* --------------------------------------------------------- */
