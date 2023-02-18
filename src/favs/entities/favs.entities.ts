import { ArtistEntity } from '../../artists/entities/artists.entities';
import { AlbumEntity } from '../../albums/entities/albums.entities';
import { TrackEntity } from '../../tracks/entities/tracks.entities';

export interface FavsEntity {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}
