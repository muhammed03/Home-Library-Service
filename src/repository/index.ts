export const db = {
  users: [
    {
      id: '22d49d0f-2200-4220-ba6b-527d0e21d277',
      login: 'testUser',
      password: 'testPassword',
      version: 1,
      createdAt: 1,
      updatedAt: 1,
    },
  ],
  artists: [
    {
      id: '86e74a6d-40ee-4ede-8402-aeea89b128dd',
      name: 'testArtist',
      grammy: true,
    },
  ],
  albums: [
    {
      id: 'ba79285b-aabf-4406-ba24-e1111f970ea9',
      name: 'testAlbum',
      year: 2011,
      artistId: '86e74a6d-40ee-4ede-8402-aeea89b128dd',
    },
  ],
  tracks: [
    {
      id: '1d9bb6fe-239c-4bfb-9d09-904c5090e81f',
      name: 'testTrack',
      artistId: '86e74a6d-40ee-4ede-8402-aeea89b128dd',
      albumId: 'ba79285b-aabf-4406-ba24-e1111f970ea9',
      duration: 2103211,
    },
  ],
  favs: {
    artists: ['86e74a6d-40ee-4ede-8402-aeea89b128dd'],
    albums: ['ba79285b-aabf-4406-ba24-e1111f970ea9'],
    tracks: ['1d9bb6fe-239c-4bfb-9d09-904c5090e81f'],
  },
};
