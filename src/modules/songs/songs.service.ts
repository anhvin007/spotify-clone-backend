import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSongDto } from './dto/song/create-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Artist } from '../../entities/artist.entity';
import { UpdateSongDto } from './dto/song/update-song.dto';
import { Song } from 'src/entities/song.entity';

@Injectable()
export class SongsService {
    
    constructor(
        @InjectRepository(Song)
        private songsRepository: Repository<Song>,
        @InjectRepository(Artist)
        private artistsRepository: Repository<Artist>
    ) {}
    async create(songDto: CreateSongDto) : Promise<Song> {
        const song = new Song();
        song.title = songDto.title;
        song.duration = songDto.duration;
        song.releasedDate = songDto.releasedDate;
        song.lyrics = songDto.lyrics;

        const artists = await this.artistsRepository.findByIds(songDto.artists);
        song.artists = artists;
        return await this.songsRepository.save(song);
    }

    findById(id: number) : Promise<Song> {
        return this.songsRepository.findOneBy({ id });
    }

    async remove(id: number) : Promise<DeleteResult> {
        return await this.songsRepository.delete(id);
    }

    update(id: number, updateSongDto: UpdateSongDto) : Promise<UpdateResult> {
        return this.songsRepository.update(id, updateSongDto);
    }


    async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
        // Adding query builder
        // If you need to add query builder you can add it here
        return paginate<Song>(this.songsRepository, options);
        }
}
