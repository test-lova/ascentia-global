import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { GraduationCap, FileText, Plane, BookOpen, Users, Globe } from 'lucide-react';

const services = [
  {
    icon: Users,
    title: 'Career Counseling',
    description: 'Professional guidance to help you choose the right career path and university.',
  },
  {
    icon: GraduationCap,
    title: 'University Selection',
    description: 'Expert assistance in selecting universities that match your profile and goals.',
  },
  {
    icon: FileText,
    title: 'Application Support',
    description: 'Complete support for university applications and documentation.',
  },
  {
    icon: BookOpen,
    title: 'Test Preparation',
    description: 'IELTS, TOEFL, SAT, GRE preparation courses and guidance.',
  },
  {
    icon: Plane,
    title: 'Visa Assistance',
    description: 'Comprehensive visa processing and interview preparation support.',
  },
  {
    icon: Globe,
    title: 'Pre-Departure',
    description: 'Orientation sessions and guidance for life abroad.',
  },
];

export function ServicesSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" ref={ref} className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
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
                  <service.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
