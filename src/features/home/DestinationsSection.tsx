import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { MapPin } from 'lucide-react';

const destinations = [
  {
    name: 'United States',
    flag: '🇺🇸',
    universities: '500+',
    image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=80&w=2000',
  },
  {
    name: 'United Kingdom',
    flag: '🇬🇧',
    universities: '300+',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2000',
  },
  {
    name: 'Australia',
    flag: '🇦🇺',
    universities: '200+',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2000',
  },
  {
    name: 'Canada',
    flag: '🇨🇦',
    universities: '250+',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=2000',
  },
  {
    name: 'Japan',
    flag: '🇯🇵',
    universities: '150+',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2000',
  },
  {
    name: 'Germany',
    flag: '🇩🇪',
    universities: '180+',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2000',
  },
];

export function DestinationsSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="destinations" ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('destinations.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('destinations.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Flag */}
                <div className="absolute top-4 right-4 text-4xl">{destination.flag}</div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{destination.universities} Universities</span>
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
