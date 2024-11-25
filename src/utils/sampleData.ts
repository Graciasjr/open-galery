export const generateSamplePhotos = () => {
  const photoSources = [
    'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    'https://images.unsplash.com/photo-1682687221038-404670f09ef1',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    'https://images.unsplash.com/photo-1682685797365-6f57bbebffed',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    'https://images.unsplash.com/photo-1682686581580-d99b0230064e',
    'https://images.unsplash.com/photo-1682686580024-c1b2c8a9c38d',
    'https://images.unsplash.com/photo-1682687982183-c2937a74257c'
  ];

  const authors = [
    'Emma Thompson', 'James Wilson', 'Sophia Chen', 'Michael Brown',
    'Isabella Martinez', 'William Davis', 'Olivia Taylor', 'Lucas Anderson'
  ];

  const titles = [
    'Mountain Vista', 'Ocean Sunset', 'Urban Life', 'Forest Path',
    'Desert Dunes', 'Arctic Lights', 'Tropical Paradise', 'Canyon Views'
  ];

  const reactions = ['❤️', '👍', '🔥', '😍', '🎨'];

  return Array.from({ length: 50 }, (_, index) => ({
    id: (index + 1).toString(),
    url: photoSources[index % photoSources.length],
    title: `${titles[index % titles.length]} ${Math.floor(index / titles.length) + 1}`,
    author: authors[index % authors.length],
    likes: Math.floor(Math.random() * 1000),
    comments: [],
    reactions: reactions
      .slice(0, Math.floor(Math.random() * reactions.length) + 1)
      .map(type => ({
        type: type as '❤️' | '👍' | '🔥' | '😍' | '🎨',
        count: Math.floor(Math.random() * 100)
      })),
    albumId: Math.random() > 0.5 ? Math.ceil(Math.random() * 5).toString() : undefined
  }));
};

export const generateSampleAlbums = () => {
  const albumTitles = [
    'Nature Escapes',
    'Urban Adventures',
    'Travel Memories',
    'Architecture',
    'Wildlife'
  ];

  const descriptions = [
    'A collection of breathtaking natural landscapes',
    'Exploring city life and urban scenes',
    'Capturing moments from around the world',
    'Stunning architectural photography',
    'Amazing wildlife encounters'
  ];

  return albumTitles.map((title, index) => ({
    id: (index + 1).toString(),
    title,
    description: descriptions[index],
    coverUrl: `https://images.unsplash.com/photo-${1682687220742 + index}-aba13b6e50ba`,
    photoCount: Math.floor(Math.random() * 20) + 5,
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString()
  }));
};
