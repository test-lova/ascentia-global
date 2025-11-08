import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Navbar } from '@/shared/components/Navbar';
import { Footer } from '@/shared/components/Footer';
import { resumeService } from '@/services/http/apiService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, User, Briefcase, GraduationCap, FileText } from 'lucide-react';

const resumeSchema = z.object({
  first_name: z.string().min(1, 'First name is required').max(100),
  middle_name: z.string().max(100).optional(),
  last_name: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Invalid email address').max(255),
  address: z.string().min(1, 'Address is required').max(500),
  skills: z.string().min(1, 'Skills are required'),
  motivation: z.string().min(1, 'Motivation is required'),
  others: z.string().optional(),
  future_dream: z.string().optional(),
  spouse: z.boolean().default(false),
  height: z.string().min(1, 'Height is required'),
  weight: z.string().min(1, 'Weight is required'),
  blood_type: z.string().min(1, 'Blood type is required'),
});

type ResumeFormData = z.infer<typeof resumeSchema>;

export default function ResumeGeneratorPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ResumeFormData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      spouse: false,
    },
  });

  const spouseValue = watch('spouse');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ResumeFormData) => {
    if (!imageFile) {
      toast({
        title: 'Error',
        description: 'Please upload a profile image',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      
      // Add all text fields
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      // Add image
      formData.append('image', imageFile);

      await resumeService.submitResume(formData);

      toast({
        title: 'Success!',
        description: 'Your resume has been submitted successfully.',
      });

      // Redirect after success
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Resume submission error:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit resume. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('resume.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('resume.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="personal">
                    <User className="h-4 w-4 mr-2" />
                    Personal
                  </TabsTrigger>
                  <TabsTrigger value="professional">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Professional
                  </TabsTrigger>
                  <TabsTrigger value="physical">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Physical Info
                  </TabsTrigger>
                  <TabsTrigger value="additional">
                    <FileText className="h-4 w-4 mr-2" />
                    Additional
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Basic information about yourself</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Profile Image Upload */}
                      <div>
                        <Label htmlFor="image">Profile Image *</Label>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                            {imagePreview ? (
                              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <User className="h-12 w-12 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <Input
                              id="image"
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="max-w-xs"
                            />
                            <p className="text-sm text-muted-foreground mt-1">
                              Upload a professional photo
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Name Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="first_name">First Name *</Label>
                          <Input
                            id="first_name"
                            {...register('first_name')}
                            placeholder="John"
                          />
                          {errors.first_name && (
                            <p className="text-sm text-destructive mt-1">{errors.first_name.message}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="middle_name">Middle Name</Label>
                          <Input
                            id="middle_name"
                            {...register('middle_name')}
                            placeholder="Michael"
                          />
                        </div>
                        <div>
                          <Label htmlFor="last_name">Last Name *</Label>
                          <Input
                            id="last_name"
                            {...register('last_name')}
                            placeholder="Doe"
                          />
                          {errors.last_name && (
                            <p className="text-sm text-destructive mt-1">{errors.last_name.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder="john.doe@example.com"
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      {/* Address */}
                      <div>
                        <Label htmlFor="address">Address *</Label>
                        <Textarea
                          id="address"
                          {...register('address')}
                          placeholder="Your full address"
                          rows={3}
                        />
                        {errors.address && (
                          <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
                        )}
                      </div>

                      {/* Spouse Status */}
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="spouse"
                          checked={spouseValue}
                          onCheckedChange={(checked) => setValue('spouse', checked)}
                        />
                        <Label htmlFor="spouse">Married / Have Spouse</Label>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="professional">
                  <Card>
                    <CardHeader>
                      <CardTitle>Professional Information</CardTitle>
                      <CardDescription>Your skills and career aspirations</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Skills */}
                      <div>
                        <Label htmlFor="skills">Skills *</Label>
                        <Textarea
                          id="skills"
                          {...register('skills')}
                          placeholder="List your skills (e.g., Communication, Leadership, Technical skills)"
                          rows={4}
                        />
                        {errors.skills && (
                          <p className="text-sm text-destructive mt-1">{errors.skills.message}</p>
                        )}
                      </div>

                      {/* Motivation */}
                      <div>
                        <Label htmlFor="motivation">Motivation *</Label>
                        <Textarea
                          id="motivation"
                          {...register('motivation')}
                          placeholder="Why do you want to work with us?"
                          rows={4}
                        />
                        {errors.motivation && (
                          <p className="text-sm text-destructive mt-1">{errors.motivation.message}</p>
                        )}
                      </div>

                      {/* Future Dream */}
                      <div>
                        <Label htmlFor="future_dream">Future Dream</Label>
                        <Textarea
                          id="future_dream"
                          {...register('future_dream')}
                          placeholder="Your career aspirations and goals"
                          rows={4}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="physical">
                  <Card>
                    <CardHeader>
                      <CardTitle>Physical Information</CardTitle>
                      <CardDescription>Required for certain positions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="height">Height (cm) *</Label>
                          <Input
                            id="height"
                            {...register('height')}
                            placeholder="170"
                          />
                          {errors.height && (
                            <p className="text-sm text-destructive mt-1">{errors.height.message}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="weight">Weight (kg) *</Label>
                          <Input
                            id="weight"
                            {...register('weight')}
                            placeholder="65"
                          />
                          {errors.weight && (
                            <p className="text-sm text-destructive mt-1">{errors.weight.message}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="blood_type">Blood Type *</Label>
                          <Input
                            id="blood_type"
                            {...register('blood_type')}
                            placeholder="A+, B+, O+, etc."
                          />
                          {errors.blood_type && (
                            <p className="text-sm text-destructive mt-1">{errors.blood_type.message}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="additional">
                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Information</CardTitle>
                      <CardDescription>Any other relevant details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="others">Other Information</Label>
                        <Textarea
                          id="others"
                          {...register('others')}
                          placeholder="Any additional information you'd like to share"
                          rows={6}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="mt-8 flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="min-w-[200px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Submit Resume
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
