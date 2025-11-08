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
import { Loader2, Upload, User, Briefcase, GraduationCap, FileText, Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const educationEntrySchema = z.object({
  year: z.string().min(1, 'Year is required'),
  month: z.string().min(1, 'Month is required'),
  description: z.string().min(1, 'Description is required'),
});

const workEntrySchema = z.object({
  year: z.string().min(1, 'Year is required'),
  month: z.string().min(1, 'Month is required'),
  description: z.string().min(1, 'Description is required'),
});

const resumeSchema = z.object({
  first_name: z.string().min(1, 'First name is required').max(100),
  middle_name: z.string().max(100).optional(),
  last_name: z.string().min(1, 'Last name is required').max(100),
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female'], { required_error: 'Gender is required' }),
  email: z.string().email('Invalid email address').max(255),
  address: z.string().min(1, 'Address is required').max(500),
  education_history: z.array(educationEntrySchema).min(1, 'At least one education entry is required'),
  work_history: z.array(workEntrySchema).optional(),
  licenses: z.string().min(1, 'Licenses/qualifications are required'),
  skills: z.string().min(1, 'Skills are required'),
  motivation: z.string().min(1, 'Motivation is required'),
  strengths: z.string().optional(),
  weaknesses: z.string().optional(),
  hobbies: z.string().optional(),
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
      gender: 'male',
      education_history: [{ year: '', month: '', description: '' }],
      work_history: [],
    },
  });

  const spouseValue = watch('spouse');
  const genderValue = watch('gender');
  const educationHistory = watch('education_history') || [];
  const workHistory = watch('work_history') || [];

  const addEducationEntry = () => {
    setValue('education_history', [...educationHistory, { year: '', month: '', description: '' }]);
  };

  const removeEducationEntry = (index: number) => {
    setValue('education_history', educationHistory.filter((_, i) => i !== index));
  };

  const addWorkEntry = () => {
    setValue('work_history', [...workHistory, { year: '', month: '', description: '' }]);
  };

  const removeWorkEntry = (index: number) => {
    setValue('work_history', workHistory.filter((_, i) => i !== index));
  };

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
          // Handle arrays (education_history, work_history)
          if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
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
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="personal">
                    <User className="h-4 w-4 mr-2" />
                    Personal
                  </TabsTrigger>
                  <TabsTrigger value="education">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Education
                  </TabsTrigger>
                  <TabsTrigger value="work">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Work
                  </TabsTrigger>
                  <TabsTrigger value="professional">
                    <FileText className="h-4 w-4 mr-2" />
                    Skills
                  </TabsTrigger>
                  <TabsTrigger value="other">
                    <FileText className="h-4 w-4 mr-2" />
                    Other
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

                      {/* Date of Birth */}
                      <div>
                        <Label htmlFor="date_of_birth">Date of Birth *</Label>
                        <Input
                          id="date_of_birth"
                          type="date"
                          {...register('date_of_birth')}
                        />
                        {errors.date_of_birth && (
                          <p className="text-sm text-destructive mt-1">{errors.date_of_birth.message}</p>
                        )}
                      </div>

                      {/* Gender */}
                      <div>
                        <Label htmlFor="gender">Gender *</Label>
                        <Select value={genderValue} onValueChange={(value) => setValue('gender', value as 'male' | 'female')}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.gender && (
                          <p className="text-sm text-destructive mt-1">{errors.gender.message}</p>
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

                      {/* Physical Information */}
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

                <TabsContent value="education">
                  <Card>
                    <CardHeader>
                      <CardTitle>Education History (学歴)</CardTitle>
                      <CardDescription>Your educational background</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {educationHistory.map((entry, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Entry {index + 1}</h4>
                            {educationHistory.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeEducationEntry(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Year *</Label>
                              <Input
                                {...register(`education_history.${index}.year`)}
                                placeholder="2010"
                              />
                              {errors.education_history?.[index]?.year && (
                                <p className="text-sm text-destructive mt-1">
                                  {errors.education_history[index]?.year?.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <Label>Month *</Label>
                              <Input
                                {...register(`education_history.${index}.month`)}
                                placeholder="3"
                              />
                              {errors.education_history?.[index]?.month && (
                                <p className="text-sm text-destructive mt-1">
                                  {errors.education_history[index]?.month?.message}
                                </p>
                              )}
                            </div>
                          </div>
                          <div>
                            <Label>Description *</Label>
                            <Textarea
                              {...register(`education_history.${index}.description`)}
                              placeholder="SHREE CHANDRA HIGHER SECONDARY SCHOOL 中学校 卒業"
                              rows={2}
                            />
                            {errors.education_history?.[index]?.description && (
                              <p className="text-sm text-destructive mt-1">
                                {errors.education_history[index]?.description?.message}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addEducationEntry}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education Entry
                      </Button>
                      {errors.education_history && typeof errors.education_history.message === 'string' && (
                        <p className="text-sm text-destructive">{errors.education_history.message}</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="work">
                  <Card>
                    <CardHeader>
                      <CardTitle>Work History (職歴)</CardTitle>
                      <CardDescription>Your professional experience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {workHistory.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No work history added yet</p>
                      ) : (
                        workHistory.map((entry, index) => (
                          <div key={index} className="border rounded-lg p-4 space-y-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Entry {index + 1}</h4>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeWorkEntry(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label>Year *</Label>
                                <Input
                                  {...register(`work_history.${index}.year`)}
                                  placeholder="2022"
                                />
                                {errors.work_history?.[index]?.year && (
                                  <p className="text-sm text-destructive mt-1">
                                    {errors.work_history[index]?.year?.message}
                                  </p>
                                )}
                              </div>
                              <div>
                                <Label>Month *</Label>
                                <Input
                                  {...register(`work_history.${index}.month`)}
                                  placeholder="7"
                                />
                                {errors.work_history?.[index]?.month && (
                                  <p className="text-sm text-destructive mt-1">
                                    {errors.work_history[index]?.month?.message}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div>
                              <Label>Description *</Label>
                              <Textarea
                                {...register(`work_history.${index}.description`)}
                                placeholder="S.N CONSTRUCTION AND CONSULTANT SERVICE PVT.TDT (スタッフ) 入社"
                                rows={2}
                              />
                              {errors.work_history?.[index]?.description && (
                                <p className="text-sm text-destructive mt-1">
                                  {errors.work_history[index]?.description?.message}
                                </p>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addWorkEntry}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Work Entry
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="professional">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills & Qualifications</CardTitle>
                      <CardDescription>Your professional abilities</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Licenses */}
                      <div>
                        <Label htmlFor="licenses">Licenses & Qualifications (免許・資格) *</Label>
                        <Textarea
                          id="licenses"
                          {...register('licenses')}
                          placeholder="KNOWLEDGE OF ARCHITECTURE OF SOFTWARE LIKE AUTOCAD, STATPRO"
                          rows={3}
                        />
                        {errors.licenses && (
                          <p className="text-sm text-destructive mt-1">{errors.licenses.message}</p>
                        )}
                      </div>

                      {/* Skills */}
                      <div>
                        <Label htmlFor="skills">Special Skills (特技、自己 PR) *</Label>
                        <Textarea
                          id="skills"
                          {...register('skills')}
                          placeholder="私は日本のよさと会社のいいことを伝えたいと思います。"
                          rows={4}
                        />
                        {errors.skills && (
                          <p className="text-sm text-destructive mt-1">{errors.skills.message}</p>
                        )}
                      </div>

                      {/* Motivation */}
                      <div>
                        <Label htmlFor="motivation">Motivation (志望動機) *</Label>
                        <Textarea
                          id="motivation"
                          {...register('motivation')}
                          placeholder="日本語を使いながら日本の技術をまなびたいです。"
                          rows={4}
                        />
                        {errors.motivation && (
                          <p className="text-sm text-destructive mt-1">{errors.motivation.message}</p>
                        )}
                      </div>

                      {/* Future Dream */}
                      <div>
                        <Label htmlFor="future_dream">Future Dream (将来の夢)</Label>
                        <Textarea
                          id="future_dream"
                          {...register('future_dream')}
                          placeholder="私の将来の夢は，日本で長く働いて良い経験を持ちたいと思います。"
                          rows={4}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="other">
                  <Card>
                    <CardHeader>
                      <CardTitle>Other Information (その他)</CardTitle>
                      <CardDescription>Additional personal details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="strengths">Strengths (長所)</Label>
                        <Textarea
                          id="strengths"
                          {...register('strengths')}
                          placeholder="どんなじょうきょうでもあきらめないで行動できます。"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="weaknesses">Weaknesses (短所)</Label>
                        <Textarea
                          id="weaknesses"
                          {...register('weaknesses')}
                          placeholder="すぐ泣いてしまうので今気をつけるようにしています。"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="hobbies">Hobbies / How to Spend Free Time (休みの過ごし方)</Label>
                        <Textarea
                          id="hobbies"
                          {...register('hobbies')}
                          placeholder="サッカーをしたり、あそんだりします。"
                          rows={3}
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
