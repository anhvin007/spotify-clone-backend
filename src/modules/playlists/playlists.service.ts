import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from 'src/entities/playlist.entity';
import { Song } from 'src/entities/song.entity';
import { User } from 'src/entities/user.entity';
import { CreatePlayListDto } from 'src/modules/playlists/dto/playList/create-playlist.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PlaylistsService {
    constructor(
        @InjectRepository(Song)
        private songsRepo: Repository<Song>,

        @InjectRepository(User)
        private userRepo: Repository<User>,

        @InjectRepository(Playlist)
        private playListRepo: Repository<Playlist>
    ) {}

    async create(playListDto: CreatePlayListDto) : Promise<Playlist> {
        const playList = new Playlist();
        playList.name = playListDto.name;

        const songs = await this.songsRepo.findByIds(playListDto.songs);
        playList.songs = songs;

        const user = await this.userRepo.findOneBy({ id: playListDto.user });
        playList.user = user;

        return this.playListRepo.save(playList);
    }
}
