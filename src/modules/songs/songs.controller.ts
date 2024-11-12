import {
    Controller,
    Query,
    Get,
    Put,
    Post,
    Body,
    Delete,
    Param,
    HttpException,
    HttpStatus,
    ParseIntPipe,
    DefaultValuePipe,
    UseGuards,
    Request,
} from '@nestjs/common'
import { SongsService } from './songs.service'
import { CreateSongDto } from './dto/song/create-song.dto'
import { DeleteResult, UpdateResult } from 'typeorm'
import { UpdateSongDto } from './dto/song/update-song.dto'
import { Pagination } from 'nestjs-typeorm-paginate'
import { Song } from 'src/entities/song.entity'
import { JwtArtistGuard } from 'src/guards/jwt-artist.guard'

@Controller('songs')
export class SongsController {
    constructor(private songsService: SongsService) {}

    @Get()
    findAllSongs(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
        limit: number = 10,
    ): Promise<Pagination<Song>> {
        try {
            limit = limit > 100 ? 100 : limit
            return this.songsService.paginate({ page, limit })
        } catch (e) {
            throw new HttpException('server error', HttpStatus.NOT_ACCEPTABLE, {
                cause: e,
            })
        }
    }

    @Get(':id')
    findById(
        @Param(
            'id',
            new ParseIntPipe({
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
            }),
        )
        id: number,
    ): Promise<Song> {
        return this.songsService.findById(id)
    }

    @Put(':id')
    update(
        @Param(
            'id',
            new ParseIntPipe({
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
            }),
        )
        id: number,
        @Body() updateSongDto: UpdateSongDto,
    ): Promise<UpdateResult> {
        return this.songsService.update(id, updateSongDto)
    }

    @Post()
    @UseGuards(JwtArtistGuard)
    create(
        @Body() createSongDto: CreateSongDto,
        @Request() req,
    ): Promise<Song> {
        console.log(req.user)
        return this.songsService.create(createSongDto)
    }

    @Delete(':id')
    remove(
        @Param(
            'id',
            new ParseIntPipe({
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
            }),
        )
        id: number,
    ): Promise<DeleteResult> {
        return this.songsService.remove(id)
    }
}
