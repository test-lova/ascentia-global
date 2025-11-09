import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 px-4 sm:px-6">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      
      {/* Animated Circles */}
      <motion.div
        className="absolute top-10 sm:top-20 -right-20 sm:right-20 w-40 h-40 sm:w-72 sm:h-72 rounded-full bg-primary/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-10 sm:bottom-20 -left-20 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-accent/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                International Education Consultancy
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {t('hero.title')}{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t('hero.titleHighlight')}
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto px-4">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary gap-2"
                >
                  {t('hero.cta')}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="gap-2">
                  {t('hero.learnMore')}
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating Cards */}
          <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 px-4">{" "}
            {[
              { icon: '🎓', title: '500+', subtitle: 'Students Placed' },
              { icon: '🌍', title: '25+', subtitle: 'Countries' },
              { icon: '⭐', title: '98%', subtitle: 'Success Rate' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.title}</div>
                <div className="text-sm text-muted-foreground">{stat.subtitle}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
