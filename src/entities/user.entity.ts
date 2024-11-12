import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "./artist.entity";
import { Playlist } from "./playlist.entity";
import { IsNotEmpty } from "class-validator";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: "Jane",
        description: "Provide the first name of the user",
    })
    @Column()
    firstName: string;

    @ApiProperty({
        example: "Doe",
        description: "Provide the last name of the user",
      })
    @Column()
    lastName: string;

    @ApiProperty({
        example: "jane_doe@gmail.com",
        description: "Provide the email of the user",
      })
    @Column({ unique: true })
    email: string;

    @Column()
    phone: string;

    @Column({ nullable: true, type: 'text' })
    twoFASecret: string;

    @Column({ default: false, type: 'boolean' })
    enable2FA: boolean;

    @ApiProperty({
        example: "test123#@",
        description: "Provide the password of the user",
      })
    @Column()
    @Exclude()
    password: string;

    @OneToMany(() => Playlist, playlist => playlist.user)
    playlists: Playlist[];
}
