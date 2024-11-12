import {
    IsArray,
    IsDateString,
    IsMilitaryTime,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateSongDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsNumber({}, { each: true })
    readonly artists: number[];


    @IsDateString()
    @IsNotEmpty()
    readonly releasedDate: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    readonly duration: Date;

    @IsString()
    @IsOptional()
    readonly lyrics: string;
}