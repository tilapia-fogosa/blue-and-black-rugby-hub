
import { useState } from 'react';
import { Card } from '@/components/ui/card';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Placeholder images for the gallery
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500&h=500&fit=crop",
      alt: "Time em ação",
      category: "Jogos"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=500&h=500&fit=crop",
      alt: "Treinamento",
      category: "Treinos"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=500&h=500&fit=crop",
      alt: "Vitória da equipe",
      category: "Vitórias"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=500&h=500&fit=crop",
      alt: "Equipe unida",
      category: "Equipe"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500&h=500&fit=crop",
      alt: "Momentos especiais",
      category: "Eventos"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=500&h=500&fit=crop",
      alt: "Conquistas",
      category: "Troféus"
    }
  ];

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
          {galleryImages.map((image) => (
            <Card 
              key={image.id}
              className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rugby-blue-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <p className="font-semibold">{image.alt}</p>
                    <p className="text-sm text-rugby-blue-primary">{image.category}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
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
