import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { servicesService } from '@/services/http/apiService';
import type { Service } from '@/shared/types/api';

export function ServicesSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesService.getServices();
        const servicesArray = Array.isArray(data) ? data : (data as { results: Service[] }).results;
        setServices(servicesArray);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section id="services" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading services...</div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section id="services" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">No services available</div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" ref={ref} className="py-12 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">{" "}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {t('services.title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">{" "}
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-7 w-7 text-primary-foreground" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{service.name}</h3>
                {service.description && (
                  <p className="text-muted-foreground">{service.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
