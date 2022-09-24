import { IsNotEmpty, IsNumber } from "class-validator";

/* ----------------------------------------- */

export class RqGetTransportDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

/* ----------------------------------------- */
