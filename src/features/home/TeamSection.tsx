import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';
import { aboutService } from '@/services/http/apiService';
import type { Team } from '@/shared/types/api';
import { User } from 'lucide-react';

export function TeamSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [team, setTeam] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await aboutService.getTeam();
        const teamArray = Array.isArray(data) ? data : (data as { results: Team[] }).results;
        setTeam(teamArray);
      } catch (error) {
        console.error('Error fetching team:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <section id="team" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading team...</div>
        </div>
      </section>
    );
  }

  if (team.length === 0) {
    return null; // Don't show section if no team members
  }

  return (
    <section id="team" ref={ref} className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('team.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('team.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={`${member.first_name} ${member.last_name}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                    <User className="h-20 w-20 text-muted-foreground" />
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">
                  {member.first_name} {member.middle_name} {member.last_name}
                </h3>
                {member.position && (
                  <p className="text-primary font-medium mb-2">{member.position.name}</p>
                )}
                {member.experience && (
                  <p className="text-sm text-muted-foreground">{member.experience}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
