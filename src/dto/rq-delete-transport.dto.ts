import { IsNotEmpty, IsNumber } from "class-validator";

/* ----------------------------------------- */

export class RqDeleteTransportDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

/* ----------------------------------------- */
