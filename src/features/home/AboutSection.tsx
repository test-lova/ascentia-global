import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';
import { CheckCircle2, Target, Eye, Award } from 'lucide-react';
import { aboutService } from '@/services/http/apiService';
import type { About, Consultancy } from '@/shared/types/api';

export function AboutSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [about, setAbout] = useState<About | null>(null);
  const [consultancy, setConsultancy] = useState<Consultancy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutData, consultancyData] = await Promise.all([
          aboutService.getAbout(),
          aboutService.getConsultancy(),
        ]);
        setAbout(aboutData);
        setConsultancy(consultancyData);
      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const features = [
    {
      icon: Target,
      title: 'Mission',
      items: about?.mission || [],
    },
    {
      icon: Eye,
      title: 'Vision',
      items: about?.vision || [],
    },
    {
      icon: Award,
      title: 'Values',
      items: about?.values || [],
    },
  ];

  if (loading) {
    return (
      <section id="about" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('about.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              {about?.image ? (
                <img
                  src={about.image}
                  alt="About us"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {about?.story && (
              <p className="text-lg text-muted-foreground leading-relaxed">
                {about.story}
              </p>
            )}

            {consultancy?.why_choose_us && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Why Choose Us</h3>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{consultancy.why_choose_us}</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <ul className="space-y-2">
                {feature.items.map((item, idx) => (
                  <li key={idx} className="text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
