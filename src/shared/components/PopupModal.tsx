import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { homeService } from '@/services/http/apiService';
import { Popup } from '@/shared/types/api';
import { Loader2 } from 'lucide-react';

interface PopupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Fallback popup data when API is not available
const FALLBACK_POPUP: Popup = {
  id: 1,
  image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=800&fit=crop',
  video: null,
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export function PopupModal({ open, onOpenChange }: PopupModalProps) {
  const [popup, setPopup] = useState<Popup | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopup = async () => {
      try {
        const data = await homeService.getActivePopup();
        setPopup(data);
      } catch (error) {
        console.error('Failed to fetch popup, using fallback:', error);
        // Use fallback data when API fails
        setPopup(FALLBACK_POPUP);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchPopup();
    }
  }, [open]);

  // Don't show dialog if there's no active popup
  if (!loading && !popup) {
    return null;
  }

  return (
    <Dialog open={open && !!popup} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-6 rounded-2xl border-2 border-border shadow-2xl bg-card">
        <DialogTitle className="sr-only">Announcement</DialogTitle>
        <DialogDescription className="sr-only">Special announcement or promotion</DialogDescription>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : popup ? (
          <div className="relative -m-6">
            {popup.image && (
              <div className="w-full">
                <img
                  src={popup.image}
                  alt="Announcement"
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
            )}
            {popup.video && (
              <div className="w-full aspect-video">
                <video
                  src={popup.video}
                  controls
                  className="w-full h-full rounded-xl"
                  autoPlay
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            {!popup.image && !popup.video && (
              <div className="p-8 text-center text-muted-foreground">
                No content available
              </div>
            )}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
