import { EntityManager } from "typeorm";
import { faker } from "@faker-js/faker";
import * as bcrypt from "bcryptjs";
import { User } from "src/entities/user.entity";
import { Artist } from "src/entities/artist.entity";
import { Playlist } from "src/entities/playlist.entity";


export const seedData = async (manager: EntityManager): Promise<void> => {
  await seedUser();
  await seedArtist();
  await seedPlayLists();

  async function seedUser() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash("123456", salt);
    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    await manager.getRepository(User).save(user);
  }

  async function seedArtist() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash("123456", salt);
    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    const artist = new Artist();
    artist.user = user;
    await manager.getRepository(User).save(user);
    await manager.getRepository(Artist).save(artist);
  }

  async function seedPlayLists() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash("123456", salt);
    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    const playList = new Playlist();
    playList.name = faker.music.genre();
    playList.user = user;
    await manager.getRepository(User).save(user);
    await manager.getRepository(Playlist).save(playList);
  }
};
