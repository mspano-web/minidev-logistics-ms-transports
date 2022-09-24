import { IsNotEmpty, IsNumber } from "class-validator";

/* ----------------------------------------- */

export class RqGetZoneDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

   constructor(id: number) {
        this.id = id;
   }
}

/* ----------------------------------------- */
