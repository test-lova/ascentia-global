import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef, useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { aboutService } from '@/services/http/apiService';
import type { Consultancy } from '@/shared/types/api';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email address').max(255),
  phone: z.string().trim().min(1, 'Phone is required').max(20),
  message: z.string().trim().min(1, 'Message is required').max(1000),
});

export function ContactSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consultancy, setConsultancy] = useState<Consultancy | null>(null);

  useEffect(() => {
    const fetchConsultancy = async () => {
      try {
        const data = await aboutService.getConsultancy();
        setConsultancy(data);
      } catch (error) {
        console.error('Error fetching consultancy info:', error);
      }
    };

    fetchConsultancy();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
    };

    try {
      // Validate input
      contactSchema.parse(data);
      
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Message sent successfully! We will get back to you soon.');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-12 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">{" "}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">{" "}
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              <p className="text-muted-foreground mb-8">
                {consultancy?.description || 'Have questions about studying abroad? Our team is here to help you every step of the way.'}
              </p>
            </div>

            <div className="space-y-6">
              {consultancy?.email && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-start gap-4"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-muted-foreground">{consultancy.email}</p>
                  </div>
                </motion.div>
              )}

              {(consultancy?.phone_number || consultancy?.telephone_number) && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-muted-foreground">
                      {consultancy.phone_number || consultancy.telephone_number}
                    </p>
                  </div>
                </motion.div>
              )}

              {consultancy?.address && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-start gap-4"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Address</h4>
                    <p className="text-muted-foreground">{consultancy.address}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  name="name"
                  placeholder={t('contact.name')}
                  required
                  maxLength={100}
                  className="h-12"
                />
              </div>

              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder={t('contact.email')}
                  required
                  maxLength={255}
                  className="h-12"
                />
              </div>

              <div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder={t('contact.phone')}
                  required
                  maxLength={20}
                  className="h-12"
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder={t('contact.message')}
                  required
                  maxLength={1000}
                  className="min-h-[150px]"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 gap-2"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    {t('contact.submit')}
                    <Send className="h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
