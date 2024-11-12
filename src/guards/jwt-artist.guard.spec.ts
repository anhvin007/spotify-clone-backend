import { JwtArtistGuard } from '../jwt-artist.guard';

describe('JwtArtistGuard', () => {
  it('should be defined', () => {
    expect(new JwtArtistGuard()).toBeDefined();
  });
});
