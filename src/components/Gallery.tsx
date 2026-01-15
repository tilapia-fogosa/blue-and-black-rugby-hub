

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { GalleryImage, Gallery as GalleryType } from '@/integrations/supabase/types';

// Extended type to include the joined gallery data
type GalleryImageWithGallery = GalleryImage & {
  galleries: GalleryType | null;
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: images, isLoading } = useQuery({
    queryKey: ['gallery-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*, galleries(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as GalleryImageWithGallery[];
    },
  });

  if (isLoading) {
    return (
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p>Carregando galeria...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-rugby-blue-dark mb-4">
            Galeria de Fotos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Reviva os melhores momentos da nossa jornada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images?.map((image) => (
            <Card
              key={image.id}
              className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              onClick={() => setSelectedImage(image.image_url)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.image_url}
                  alt={image.alt_text || "Imagem da galeria"}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rugby-blue-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <p className="font-semibold">{image.alt_text || image.galleries?.title || "Imagem"}</p>
                    <p className="text-sm text-rugby-blue-primary">{image.galleries?.category || "Geral"}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {images?.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              <p>Nenhuma imagem encontrada na galeria.</p>
            </div>
          )}
        </div>

        {/* Modal for enlarged image */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img
                src={selectedImage}
                alt="Imagem ampliada"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <button
                className="absolute top-4 right-4 text-white bg-rugby-blue-dark/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-rugby-blue-dark/80 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
