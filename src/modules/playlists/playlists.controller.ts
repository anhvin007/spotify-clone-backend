import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlayListDto } from 'src/modules/playlists/dto/playList/create-playlist.dto';
import { Playlist } from 'src/entities/playlist.entity';

@Controller('playlists')
export class PlaylistsController {

    constructor(
        private playListService: PlaylistsService  
    ) {}

    @Post()
    create(
        @Body()
        playListDto: CreatePlayListDto
    ) : Promise<Playlist> {
        return this.playListService.create(playListDto);
    }
}
