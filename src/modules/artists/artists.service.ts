import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
    constructor(
        @InjectRepository(Artist)
        private artistReposiroty: Repository<Artist>
    ) {}

    findArtist(userId: number) : Promise<Artist> {
        return this.artistReposiroty.findOneBy({ user: { id: userId } });
    }
}
