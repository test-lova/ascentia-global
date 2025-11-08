import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Navbar } from '@/shared/components/Navbar';
import { Footer } from '@/shared/components/Footer';
import { galleryService } from '@/services/http/apiService';
import type { Gallery as GalleryType, PaginatedResponse } from '@/shared/types/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function Gallery() {
  const { t } = useTranslation();
  const [galleries, setGalleries] = useState<GalleryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const data = await galleryService.getGalleries();
        const galleryList = Array.isArray(data) ? data : (data as PaginatedResponse<GalleryType>).results;
        setGalleries(galleryList);
      } catch (error) {
        console.error('Error fetching galleries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('gallery.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('gallery.subtitle')}
            </p>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.map((gallery, index) => (
                <motion.div
                  key={gallery.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video w-full overflow-hidden bg-muted flex items-center justify-center">
                      {gallery.photos && gallery.photos.length > 0 ? (
                        <img
                          src={gallery.photos[0].image}
                          alt={gallery.title || 'Gallery'}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <p className="text-muted-foreground">No images</p>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle>{gallery.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{gallery.description}</p>
                      {gallery.photos && gallery.photos.length > 0 && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {gallery.photos.length} {gallery.photos.length === 1 ? 'photo' : 'photos'}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
