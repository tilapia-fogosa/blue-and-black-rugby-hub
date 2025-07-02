
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

const Shop = () => {
  const products = [
    {
      id: 1,
      name: "Camisa Oficial 2024",
      price: "R$ 89,90",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=300&fit=crop",
      category: "Vestuário"
    },
    {
      id: 2,
      name: "Shorts de Treino",
      price: "R$ 49,90",
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=300&h=300&fit=crop",
      category: "Vestuário"
    },
    {
      id: 3,
      name: "Bola de Rugby Oficial",
      price: "R$ 149,90",
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=300&h=300&fit=crop",
      category: "Equipamentos"
    },
    {
      id: 4,
      name: "Boné Eagles",
      price: "R$ 39,90",
      image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=300&h=300&fit=crop",
      category: "Acessórios"
    },
    {
      id: 5,
      name: "Caneca do Clube",
      price: "R$ 24,90",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=300&fit=crop",
      category: "Lembranças"
    },
    {
      id: 6,
      name: "Kit Torcedor",
      price: "R$ 199,90",
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=300&h=300&fit=crop",
      category: "Combos"
    }
  ];

  return (
    <section id="shop" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-rugby-blue-dark mb-4">
            Loja Oficial
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Vista as cores do Eagles e mostre seu apoio ao time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-rugby-blue-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {product.category}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-rugby-blue-dark mb-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-rugby-blue-primary">
                    {product.price}
                  </span>
                </div>

                <Button 
                  className="w-full bg-rugby-blue-dark hover:bg-rugby-blue-dark/90 text-white flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Adicionar ao Carrinho
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-rugby-blue-primary hover:bg-rugby-blue-primary/90 text-white px-8 py-4 text-lg"
          >
            Ver Todos os Produtos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Shop;
