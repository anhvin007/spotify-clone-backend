import { IsArray, IsDateString, IsMilitaryTime, IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateSongDto {

    @IsOptional()
    @IsString()
    readonly title?: string;

    @IsOptional()
    // @IsArray()
    // @IsString({ each: true })
    @IsNumber({}, { each: true })
    readonly artists?;

    @IsOptional()
    @IsDateString()
    readonly releasedDate?: Date;

    @IsOptional()
    @IsMilitaryTime()
    readonly duration?: Date;

    @IsOptional()
    @IsString()
    readonly lyrics?: string;
}