/**
 * TypeScript interfaces for API responses
 * Generated based on Django models and DRF serializers
 */

// ============================================================================
// Common Types
// ============================================================================

export type DateTimeString = string; // ISO 8601 format
export type DateString = string; // ISO 8601 format (date only)
export type ImageURL = string;
export type FileURL = string;
export type Slug = string;

// ============================================================================
// About Models
// ============================================================================

export interface Consultancy {
  id: number;
  name: string | null;
  description: string | null;
  why_choose_us: string | null;
  address: string | null;
  map_url: string | null;
  logo: ImageURL | null;
  telephone_number: string | null;
  phone_number: string | null;
  email: string | null;
  whatsapp: string | null;
  facebook: string | null;
  tiktok: string | null;
  instagram: string | null;
  working_hours: string | null;
  created_at: DateTimeString;
  updated_at: DateTimeString;
}

export interface PositionCatalog {
  id: number;
  name: string;
  created_at: DateTimeString;
  updated_at: DateTimeString;
}

export interface Team {
  id: number;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  image: ImageURL | null;
  position: PositionCatalog | null;
  position_id?: number; // Write-only field
  experience: string | null;
  created_at: DateTimeString;
  updated_at: DateTimeString;
}

export interface About {
  id: number;
  story: string | null;
  mission: string[] | null;
  vision: string[] | null;
  values: string[] | null;
  image: ImageURL | null;
  created_at: DateTimeString;
  updated_at: DateTimeString;
}

export interface Accreditation {
  id: number;
  name: string;
  logo: ImageURL;
  url: string | null;
  order: number;
  is_active: boolean;
  created_at: DateTimeString;
  updated_at: DateTimeString;
}

export interface Experience {
  id: number;
  title: string;
  about: string | null;
  experience: string[] | null;
  image: ImageURL | null;
  order: number;
  created_at: DateTimeString;
  updated_at: DateTimeString;
}

// ============================================================================
// Admission Models
// ============================================================================

export type EducationType = "NEB +2" | "Diploma" | "Bachelors" | "Masters" | "PhD";

export interface Admission {
  id: number;
  full_name: string;
  email: string;
  contact_number: string;
  address: string;
  education: EducationType;
  country: number | null; // Destination ID
  message: string;
  created_at: DateTimeString;
}

// ============================================================================
// Blog Models
// ============================================================================

export interface Blog {
  id: number;
  title: string | null;
  slug: Slug;
  description: string | null;
  banner: ImageURL | null;
  content: string; // HTML content
  created_at: DateTimeString;
  updated_at: DateTimeString;
}

// ============================================================================
// Contact Models
// ============================================================================

export interface Contact {
  id: number;
  full_name: string | null;
  email: string | null;
  contact_number: string | null;
  address: string | null;
  message: string | null;
  created_at: DateTimeString;
}

// ============================================================================
// Destinations Models
// ============================================================================

export interface ProgramCatalog {
  id: number;
  name: string;
  created_at: DateTimeString;
  updated_at: DateTimeString;
}

export interface UniversitySimple {
  id: number;
  name: string;
  ranking: number;
}

export interface University {
  id: number;
  name: string;
  image: ImageURL | null;
  ranking: number;
  about: string | null;
  destination: number | null; // Destination ID
  destination_id?: number; // Write-only field
  programs: ProgramCatalog[];
  program_ids?: number[]; // Write-only field
  tuition_fee: string | null;
  duration: string | null;
  admission_requirements: string[] | null;
  created_at: DateTimeString;
  updated_at: DateTimeString;
}

export interface Destination {
  id: number;
  name: string;
  slug: Slug;
  image: ImageURL | null;
  flag: string;
  description: string | null;
  why_study: string[] | null;
  top_universities: UniversitySimple[];
  top_university_ids?: number[]; // Write-only field
  popular_courses: ProgramCatalog[];
  popular_course_ids?: number[]; // Write-only field
  is_active: boolean;
  order: number;
  created_at: DateTimeString;
  updated_at: DateTimeString;
}

// ============================================================================
// FAQ Models
// ============================================================================

export interface FAQItem {
  order: number;
  question: string;
  answer: string;
}

export interface FAQ {
  id: number;
  faq: FAQItem[] | null;
  sorted_faq?: FAQItem[]; // Computed field from serializer
}

// ============================================================================
// Gallery Models
// ============================================================================

export interface GalleryImage {
  id: number;
  gallery: number; // Gallery ID
  image: ImageURL;
  uploaded_at: DateTimeString;
}

export interface Gallery {
  id: number;
  title: string | null;
  description: string | null;
  photos: GalleryImage[];
  photo_ids?: number[]; // Write-only field
  created_at: DateTimeString;
  updated_at: DateTimeString;
}

// ============================================================================
// Home Models
// ============================================================================

export interface Popup {
  id: number;
  image: ImageURL | null;
  video: FileURL | null;
  is_active: boolean;
  created_at: DateTimeString;
  updated_at: DateTimeString;
}

export interface Hero {
  id: number;
  title: string;
  description: string;
  mage: ImageURL | null; // Note: typo in model field name
  video: FileURL | null;
  order: number;
  created_at: DateTimeString;
  updated_at: DateTimeString;
}

// ============================================================================
// News Models
// ============================================================================

export interface NewsUpdate {
  id: number;
  title: string | null;
  description: string | null;
  banner: ImageURL | null;
  slug: Slug;
  content: string; // HTML content
  created_at: DateTimeString;
  updated_at: DateTimeString;
}

// ============================================================================
// Resources Models
// ============================================================================

export type ResourceType = "guides" | "brochures" | "forms";

export interface Resources {
  id: number;
  title: string | null;
  description: string | null;
  resource_type: ResourceType | null;
  file: FileURL | null;
  is_active: boolean;
  created_at: DateTimeString;
  updated_at: DateTimeString;
}

// ============================================================================
// Resume Models
// ============================================================================

export interface Education {
  id: number;
  resume: number; // Resume ID
  institution: string;
  degree: string;
  field_of_study: string | null;
  start_year: DateString;
  end_year: DateString | null;
  description: string | null;
}

export interface ResumeExperience {
  id: number;
  resume: number; // Resume ID
  company: string;
  role: string;
  start_year: DateString;
  start_month: string; // MonthField format
  end_year: DateString | null;
  end_month: string; // MonthField format
  description: string | null;
}

export interface ResumeDocument {
  id: number;
  resume: number; // Resume ID
  file: FileURL;
  title: string;
  uploaded_at: DateTimeString;
}

export interface Resume {
  id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  image: ImageURL;
  email: string;
  address: string;
  skills: string;
  motivation: string;
  others: string | null;
  future_dream: string | null;
  spouse: boolean;
  height: string;
  weight: string;
  blood_type: string;
  created_at: DateTimeString;
  updated_at: DateTimeString;
  educations?: Education[]; // If included in serializer
  experiences?: ResumeExperience[]; // If included in serializer
  documents?: ResumeDocument[]; // If included in serializer
}

// ============================================================================
// Services Models
// ============================================================================

export interface ServiceOffer {
  service: string;
  summary: string;
}

export interface ServiceProcess {
  process: string;
  summary: string;
}

export interface Service {
  id: number;
  name: string;
  image: ImageURL | null;
  description: string;
  why_to_choose: string[] | null;
  offer: ServiceOffer[] | null;
  process: ServiceProcess[] | null;
  order: number;
}

export interface TestPreparationModule {
  name: string;
  summary: string;
  duration: number; // 1-365 days
  section: number; // 1-10
}

export interface TestPreparationProcess {
  name: string;
  summary: string;
}

export interface TestPreparationFeature {
  name: string;
  summary: string;
}

export interface TestPreparation {
  id: number;
  name: string;
  description: string;
  about: string;
  modules: TestPreparationModule[] | null;
  process: TestPreparationProcess[] | null;
  features: TestPreparationFeature[] | null;
  order: number;
}

// ============================================================================
// Testimonials Models
// ============================================================================

export type Rating = "one" | "two" | "three" | "four" | "five";

export interface DestinationSimple {
  id: number;
  name: string;
  slug: Slug;
}

export interface Testimonials {
  id: number;
  name: string;
  image: ImageURL | null;
  destination: DestinationSimple | null;
  destination_id?: number; // Write-only field
  university: UniversitySimple | null;
  university_id?: number; // Write-only field
  rating: Rating;
  message: string;
  order: number;
}

export interface SuccessStory {
  id: number;
  name: string;
  image: ImageURL | null;
  video: FileURL;
  destination: DestinationSimple | null;
  destination_id?: number; // Write-only field
  university: UniversitySimple | null;
  university_id?: number; // Write-only field
  order: number;
}

// ============================================================================
// API Response Wrappers
// ============================================================================

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface APIError {
  detail?: string;
  [key: string]: any;
}

// ============================================================================
// API Endpoint Response Types
// ============================================================================

// About endpoints
export type ConsultancyResponse = Consultancy;
export type AccreditationResponse = Accreditation;
export type AboutResponse = About;
export type PositionCatalogResponse = PositionCatalog | PositionCatalog[];
export type TeamResponse = Team | Team[];
export type ExperienceResponse = Experience | Experience[];

// Admission endpoints
export type AdmissionResponse = Admission | Admission[];

// Blog endpoints
export type BlogResponse = Blog | Blog[] | PaginatedResponse<Blog>;

// Contact endpoints
export type ContactResponse = Contact | Contact[];

// Destinations endpoints
export type ProgramCatalogResponse = ProgramCatalog | ProgramCatalog[];
export type UniversityResponse = University | University[] | PaginatedResponse<University>;
export type DestinationResponse = Destination | Destination[] | PaginatedResponse<Destination>;

// FAQ endpoints
export type FAQResponse = FAQ | FAQ[];

// Gallery endpoints
export type GalleryImageResponse = GalleryImage | GalleryImage[];
export type GalleryResponse = Gallery | Gallery[] | PaginatedResponse<Gallery>;

// Home endpoints
export type PopupResponse = Popup | Popup[];
export type HeroResponse = Hero | Hero[];

// News endpoints
export type NewsUpdateResponse = NewsUpdate | NewsUpdate[] | PaginatedResponse<NewsUpdate>;

// Resources endpoints
export type ResourcesResponse = Resources | Resources[] | PaginatedResponse<Resources>;

// Resume endpoints
export type ResumeResponse = Resume | Resume[] | PaginatedResponse<Resume>;
export type EducationResponse = Education | Education[];
export type ResumeExperienceResponse = ResumeExperience | ResumeExperience[];
export type ResumeDocumentResponse = ResumeDocument | ResumeDocument[];

// Services endpoints
export type ServiceResponse = Service | Service[];
export type TestPreparationResponse = TestPreparation | TestPreparation[];

// Testimonials endpoints
export type TestimonialsResponse = Testimonials | Testimonials[] | PaginatedResponse<Testimonials>;
export type SuccessStoryResponse = SuccessStory | SuccessStory[] | PaginatedResponse<SuccessStory>;

