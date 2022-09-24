import {  IsOptional } from "class-validator";

/* ----------------------------------------- */

export class RqUpdateTransportDto {
    @IsOptional()
    owner_name?: string;

    @IsOptional()
    vehicle_identification?: string;

    @IsOptional()
    volume_capacity?: number;

    @IsOptional()
    weight_capacity?: number;

    @IsOptional()
    cellphone_number?: string;

    @IsOptional()
    zone_id?: number;
}

/* ----------------------------------------- */
