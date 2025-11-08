import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Navbar } from '@/shared/components/Navbar';
import { Footer } from '@/shared/components/Footer';
import { destinationsService } from '@/services/http/apiService';
import type { Destination, PaginatedResponse } from '@/shared/types/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, MapPin } from 'lucide-react';

export default function DestinationDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestination = async () => {
      if (!id) return;
      try {
        const data = await destinationsService.getDestination(parseInt(id));
        setDestination(data);
      } catch (error) {
        console.error('Error fetching destination:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <p className="text-center text-muted-foreground">{t('common.notFound')}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/destinations">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('common.back')}
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            {destination.image && (
              <div className="aspect-[21/9] w-full overflow-hidden rounded-lg mb-8">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">
                {destination.name}
              </h1>
            </div>
            
            <div className="prose prose-lg max-w-none mb-8">
              {destination.description && (
                <p className="text-muted-foreground whitespace-pre-wrap">{destination.description}</p>
              )}
            </div>

            {destination.why_study && destination.why_study.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Why Study Here?</h2>
                <ul className="list-disc list-inside space-y-2">
                  {destination.why_study.map((item, idx) => (
                    <li key={idx} className="text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {destination.top_universities && destination.top_universities.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Top Universities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.top_universities.map((uni) => (
                    <Card key={uni.id}>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{uni.name}</h3>
                        <p className="text-sm text-muted-foreground">Ranking: #{uni.ranking}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
