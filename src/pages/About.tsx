import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Navbar } from '@/shared/components/Navbar';
import { Footer } from '@/shared/components/Footer';
import { aboutService } from '@/services/http/apiService';
import type { About as AboutType, Team } from '@/shared/types/api';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();
  const [about, setAbout] = useState<AboutType | null>(null);
  const [team, setTeam] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutData, teamData] = await Promise.all([
          aboutService.getAbout(),
          aboutService.getTeam()
        ]);
        setAbout(aboutData);
        setTeam(teamData);
      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {about && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-16"
          >
            {about.image && (
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
                <img
                  src={about.image}
                  alt="About Us"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('about.title')}</h1>
            <div className="prose prose-lg max-w-none">
              {about.story && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                  <p className="text-muted-foreground whitespace-pre-wrap">{about.story}</p>
                </div>
              )}
              {about.mission && about.mission.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {about.mission.map((item, idx) => (
                      <li key={idx} className="text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {about.vision && about.vision.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {about.vision.map((item, idx) => (
                      <li key={idx} className="text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
          )}

          {/* Team Section */}
          <div className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('team.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    {member.image && (
                      <div className="aspect-square w-full overflow-hidden">
                        <img
                          src={member.image}
                          alt={`${member.first_name} ${member.last_name}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-6 text-center">
                      <h3 className="font-bold text-xl mb-1">
                        {member.first_name} {member.middle_name && member.middle_name + ' '}{member.last_name}
                      </h3>
                      {member.position && (
                        <p className="text-primary mb-2">{member.position.name}</p>
                      )}
                      {member.experience && (
                        <p className="text-sm text-muted-foreground">{member.experience}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
