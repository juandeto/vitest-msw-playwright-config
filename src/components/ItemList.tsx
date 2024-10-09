import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ImageIcon } from 'lucide-react';

interface Artwork {
  id: number;
  image_id: string;
  title: string;
  artist_title: string;
}

const ItemList: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get(
          'https://api.artic.edu/api/v1/artworks',
          {
            params: {
              limit: 20,
              fields: 'id,title,image_id,artist_title',
            },
          },
        );
        setArtworks(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching artworks:', error);
        setError('Failed to fetch artworks. Please try again later.');
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {artworks.map((artwork) => (
        <Link
          to={`/item/${artwork.id}`}
          key={artwork.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            {artwork.image_id ? (
              <img
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageIcon className="text-gray-400 w-12 h-12" />
            )}
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold truncate">{artwork.title}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {artwork.artist_title || 'Unknown Artist'}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ItemList;
