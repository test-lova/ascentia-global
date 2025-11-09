import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { destinationsService } from '@/services/http/apiService';
import type { Destination } from '@/shared/types/api';

export function DestinationsSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await destinationsService.getDestinations();
        const destinationsArray = Array.isArray(data) ? data : (data as { results: Destination[] }).results;
        setDestinations(destinationsArray);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <section id="destinations" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading destinations...</div>
        </div>
      </section>
    );
  }

  if (destinations.length === 0) {
    return (
      <section id="destinations" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">No destinations available</div>
        </div>
      </section>
    );
  }

  return (
    <section id="destinations" ref={ref} className="py-12 sm:py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">{" "}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {t('destinations.title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            {t('destinations.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">{" "}
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {destination.image ? (
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Flag or Icon */}
                {destination.flag && (
                  <div className="absolute top-4 right-4">
                    <img src={destination.flag} alt={`${destination.name} flag`} className="h-10 w-15 object-cover rounded shadow-lg" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                {destination.description && (
                  <p className="text-sm text-white/90 mb-2 line-clamp-2">{destination.description}</p>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>Study Destination</span>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-accent/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-semibold text-lg">Explore Programs</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
