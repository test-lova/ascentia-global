import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Navbar } from '@/shared/components/Navbar';
import { Footer } from '@/shared/components/Footer';
import { testimonialsService } from '@/services/http/apiService';
import type { Testimonials as TestimonialsType, PaginatedResponse, Rating } from '@/shared/types/api';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Quote, Star } from 'lucide-react';

const getRatingNumber = (rating: Rating): number => {
  const ratingMap: Record<Rating, number> = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
  };
  return ratingMap[rating] || 0;
};

export default function Testimonials() {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState<TestimonialsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await testimonialsService.getTestimonials();
        const testimonialsList = Array.isArray(data) ? data : (data as PaginatedResponse<TestimonialsType>).results;
        setTestimonials(testimonialsList);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
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
              {t('testimonials.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Quote className="h-8 w-8 text-primary mb-4" />
                      <p className="text-muted-foreground mb-6 italic">
                        "{testimonial.message}"
                      </p>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={testimonial.image || undefined} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold">{testimonial.name}</p>
                          {testimonial.university && (
                            <p className="text-sm text-muted-foreground">{testimonial.university.name}</p>
                          )}
                          {testimonial.rating && (
                            <div className="flex items-center gap-1 mt-1">
                              {Array.from({ length: getRatingNumber(testimonial.rating) }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
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
