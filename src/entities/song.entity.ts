import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "./artist.entity";
import { Playlist } from "./playlist.entity";

@Entity("songs")
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
    @JoinTable({ name: "sonngs_artists"})
    artists: Artist[];

    @ManyToOne(() => Playlist, playlist => playlist.songs)
    playlist: Playlist;

    @Column()
    title: string;

    @Column({type: "date" })
    releasedDate: Date;

    @Column({type: "time" })
    duration: Date;

    @Column({type: "text" })
    lyrics: string;
}