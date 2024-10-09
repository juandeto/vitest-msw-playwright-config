import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeftIcon, ImageIcon } from 'lucide-react';
import CopyrightWarning from './CopyrightWarning';

interface ArtworkDetails {
  id: number;
  image_id: string;
  title: string;
  artist_title: string;
  date_display: string;
  medium_display: string;
  dimensions: string;
  department_title: string;
  place_of_origin: string;
}

const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artwork, setArtwork] = useState<ArtworkDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtworkDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.artic.edu/api/v1/artworks/${id}`,
          {
            params: {
              fields:
                'id,title,image_id,artist_title,date_display,medium_display,dimensions,department_title,place_of_origin',
            },
          },
        );
        setArtwork(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching artwork details:', error);
        setError('Failed to fetch artwork details. Please try again later.');
        setLoading(false);
      }
    };

    fetchArtworkDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  if (!artwork) {
    return <div className="text-center mt-8">Artwork not found</div>;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to List
        </Link>
        <div className="md:flex">
          <div className="md:w-1/2">
            {artwork.image_id ? (
              <img
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/600,/0/default.jpg`}
                alt={artwork.title}
                className="w-full h-auto"
              />
            ) : (
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <ImageIcon className="text-gray-400 w-16 h-16" />
              </div>
            )}
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-2xl font-bold mb-4">{artwork.title}</h1>
            <p className="text-lg mb-2">
              <strong>Artist:</strong> {artwork.artist_title || 'Unknown'}
            </p>
            <p className="mb-2">
              <strong>Date:</strong> {artwork.date_display}
            </p>
            <p className="mb-2">
              <strong>Medium:</strong> {artwork.medium_display}
            </p>
            <p className="mb-2">
              <strong>Dimensions:</strong> {artwork.dimensions}
            </p>
            <p className="mb-2">
              <strong>Department:</strong> {artwork.department_title}
            </p>
            <p className="mb-2">
              <strong>Place of Origin:</strong> {artwork.place_of_origin}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <CopyrightWarning />
      </div>
    </>
  );
};

export default ItemDetails;
