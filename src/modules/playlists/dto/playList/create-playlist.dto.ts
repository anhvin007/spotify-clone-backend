import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreatePlayListDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, { each: true })
    readonly songs: number[];

    @IsNotEmpty()
    @IsNumber()
    readonly user: number;

}