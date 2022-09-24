import { IsNotEmpty, IsNumber } from "class-validator";

/* ----------------------------------------- */

export class RqGetTransporByZoneDto {
    @IsNotEmpty()
    @IsNumber()
    zone_id: number;
}

/* ----------------------------------------- */
