/**
 * API Service for fetching data from Django REST Framework API
 * Only GET requests are implemented since Django Admin handles CRUD operations
 */

import type {
  About,
  Accreditation,
  Blog,
  Consultancy,
  Contact,
  Destination,
  Education,
  Experience,
  FAQ,
  Gallery,
  GalleryImage,
  Hero,
  NewsUpdate,
  PaginatedResponse,
  Popup,
  PositionCatalog,
  ProgramCatalog,
  Resources,
  Resume,
  ResumeDocument,
  ResumeExperience,
  Service,
  SuccessStory,
  Team,
  Testimonials,
  TestPreparation,
  University,
} from '@/shared/types/api';

// ============================================================================
// Configuration
// ============================================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL || '/api/v1';

interface RequestOptions {
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Builds a query string from parameters
 */
function buildQueryString(params: Record<string, string | number | boolean>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Makes a GET request to the API
 */
async function get<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, headers = {} } = options;
  
  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    url += buildQueryString(params);
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// ============================================================================
// About API Services
// ============================================================================

export const aboutService = {
  /**
   * Get consultancy information
   */
  getConsultancy: async (): Promise<Consultancy> => {
    return get<Consultancy>('/about/consultancy/');
  },

  /**
   * Get all accreditations
   */
  getAccreditations: async (options?: RequestOptions): Promise<Accreditation[]> => {
    return get<Accreditation[]>('/about/accreditations/', options);
  },

  /**
   * Get a single accreditation by ID
   */
  getAccreditation: async (id: number): Promise<Accreditation> => {
    return get<Accreditation>(`/about/accreditations/${id}/`);
  },

  /**
   * Get about information
   */
  getAbout: async (): Promise<About> => {
    return get<About>('/about/about/');
  },

  /**
   * Get all position catalogs
   */
  getPositions: async (options?: RequestOptions): Promise<PositionCatalog[]> => {
    return get<PositionCatalog[]>('/about/positions/', options);
  },

  /**
   * Get a single position catalog by ID
   */
  getPosition: async (id: number): Promise<PositionCatalog> => {
    return get<PositionCatalog>(`/about/positions/${id}/`);
  },

  /**
   * Get all team members
   */
  getTeam: async (options?: RequestOptions): Promise<Team[]> => {
    return get<Team[]>('/about/team/', options);
  },

  /**
   * Get a single team member by ID
   */
  getTeamMember: async (id: number): Promise<Team> => {
    return get<Team>(`/about/team/${id}/`);
  },

  /**
   * Get all experiences
   */
  getExperiences: async (options?: RequestOptions): Promise<Experience[]> => {
    return get<Experience[]>('/about/experiences/', options);
  },

  /**
   * Get a single experience by ID
   */
  getExperience: async (id: number): Promise<Experience> => {
    return get<Experience>(`/about/experiences/${id}/`);
  },
};

// ============================================================================
// Blog API Services
// ============================================================================

export const blogService = {
  /**
   * Get all blogs (paginated)
   */
  getBlogs: async (options?: RequestOptions): Promise<PaginatedResponse<Blog> | Blog[]> => {
    return get<PaginatedResponse<Blog> | Blog[]>('/blog/blogs/', options);
  },

  /**
   * Get a single blog by ID
   */
  getBlog: async (id: number): Promise<Blog> => {
    return get<Blog>(`/blog/blogs/${id}/`);
  },

  /**
   * Get a blog by slug
   */
  getBlogBySlug: async (slug: string): Promise<Blog> => {
    return get<Blog>(`/blog/blogs/`, { params: { slug } });
  },
};

// ============================================================================
// Contact API Services
// ============================================================================

export const contactService = {
  /**
   * Get all contacts (typically admin-only, but included for completeness)
   */
  getContacts: async (options?: RequestOptions): Promise<Contact[]> => {
    return get<Contact[]>('/contact/contacts/', options);
  },

  /**
   * Get a single contact by ID
   */
  getContact: async (id: number): Promise<Contact> => {
    return get<Contact>(`/contact/contacts/${id}/`);
  },
};

// ============================================================================
// Destinations API Services
// ============================================================================

export const destinationsService = {
  /**
   * Get all destinations (paginated)
   */
  getDestinations: async (options?: RequestOptions): Promise<PaginatedResponse<Destination> | Destination[]> => {
    return get<PaginatedResponse<Destination> | Destination[]>('/destinations/destinations/', options);
  },

  /**
   * Get a single destination by ID
   */
  getDestination: async (id: number): Promise<Destination> => {
    return get<Destination>(`/destinations/destinations/${id}/`);
  },

  /**
   * Get a destination by slug
   */
  getDestinationBySlug: async (slug: string): Promise<Destination> => {
    return get<Destination>(`/destinations/destinations/`, { params: { slug } });
  },

  /**
   * Get all program catalogs
   */
  getPrograms: async (options?: RequestOptions): Promise<ProgramCatalog[]> => {
    return get<ProgramCatalog[]>('/destinations/programs/', options);
  },

  /**
   * Get a single program catalog by ID
   */
  getProgram: async (id: number): Promise<ProgramCatalog> => {
    return get<ProgramCatalog>(`/destinations/programs/${id}/`);
  },

  /**
   * Get all universities (paginated)
   */
  getUniversities: async (options?: RequestOptions): Promise<PaginatedResponse<University> | University[]> => {
    return get<PaginatedResponse<University> | University[]>('/destinations/universities/', options);
  },

  /**
   * Get a single university by ID
   */
  getUniversity: async (id: number): Promise<University> => {
    return get<University>(`/destinations/universities/${id}/`);
  },
};

// ============================================================================
// FAQ API Services
// ============================================================================

export const faqService = {
  /**
   * Get all FAQs
   */
  getFAQs: async (options?: RequestOptions): Promise<FAQ[]> => {
    return get<FAQ[]>('/faq/faqs/', options);
  },

  /**
   * Get a single FAQ by ID
   */
  getFAQ: async (id: number): Promise<FAQ> => {
    return get<FAQ>(`/faq/faqs/${id}/`);
  },
};

// ============================================================================
// Gallery API Services
// ============================================================================

export const galleryService = {
  /**
   * Get all galleries (paginated)
   */
  getGalleries: async (options?: RequestOptions): Promise<PaginatedResponse<Gallery> | Gallery[]> => {
    return get<PaginatedResponse<Gallery> | Gallery[]>('/gallery/galleries/', options);
  },

  /**
   * Get a single gallery by ID
   */
  getGallery: async (id: number): Promise<Gallery> => {
    return get<Gallery>(`/gallery/galleries/${id}/`);
  },

  /**
   * Get all gallery images
   */
  getPhotos: async (options?: RequestOptions): Promise<GalleryImage[]> => {
    return get<GalleryImage[]>('/gallery/photos/', options);
  },

  /**
   * Get a single gallery image by ID
   */
  getPhoto: async (id: number): Promise<GalleryImage> => {
    return get<GalleryImage>(`/gallery/photos/${id}/`);
  },
};

// ============================================================================
// Home API Services
// ============================================================================

export const homeService = {
  /**
   * Get all popups
   */
  getPopups: async (options?: RequestOptions): Promise<Popup[]> => {
    return get<Popup[]>('/home/popups/', options);
  },

  /**
   * Get a single popup by ID
   */
  getPopup: async (id: number): Promise<Popup> => {
    return get<Popup>(`/home/popups/${id}/`);
  },

  /**
   * Get active popup
   */
  getActivePopup: async (): Promise<Popup | null> => {
    const popups = await get<Popup[]>('/home/popups/', { params: { is_active: true } });
    return popups.length > 0 ? popups[0] : null;
  },

  /**
   * Get all heroes
   */
  getHeroes: async (options?: RequestOptions): Promise<Hero[]> => {
    return get<Hero[]>('/home/heroes/', options);
  },

  /**
   * Get a single hero by ID
   */
  getHero: async (id: number): Promise<Hero> => {
    return get<Hero>(`/home/heroes/${id}/`);
  },
};

// ============================================================================
// News API Services
// ============================================================================

export const newsService = {
  /**
   * Get all news updates (paginated)
   */
  getNewsUpdates: async (options?: RequestOptions): Promise<PaginatedResponse<NewsUpdate> | NewsUpdate[]> => {
    return get<PaginatedResponse<NewsUpdate> | NewsUpdate[]>('/news/news-updates/', options);
  },

  /**
   * Get a single news update by ID
   */
  getNewsUpdate: async (id: number): Promise<NewsUpdate> => {
    return get<NewsUpdate>(`/news/news-updates/${id}/`);
  },

  /**
   * Get a news update by slug
   */
  getNewsUpdateBySlug: async (slug: string): Promise<NewsUpdate> => {
    return get<NewsUpdate>(`/news/news-updates/`, { params: { slug } });
  },
};

// ============================================================================
// Resources API Services
// ============================================================================

export const resourcesService = {
  /**
   * Get all resources (paginated)
   */
  getResources: async (options?: RequestOptions): Promise<PaginatedResponse<Resources> | Resources[]> => {
    return get<PaginatedResponse<Resources> | Resources[]>('/resources/resources/', options);
  },

  /**
   * Get a single resource by ID
   */
  getResource: async (id: number): Promise<Resources> => {
    return get<Resources>(`/resources/resources/${id}/`);
  },

  /**
   * Get resources by type
   */
  getResourcesByType: async (type: 'guides' | 'brochures' | 'forms'): Promise<Resources[]> => {
    return get<Resources[]>('/resources/resources/', { params: { resource_type: type } });
  },
};

// ============================================================================
// Services API Services
// ============================================================================

export const servicesService = {
  /**
   * Get all services
   */
  getServices: async (options?: RequestOptions): Promise<Service[]> => {
    return get<Service[]>('/services/services/', options);
  },

  /**
   * Get a single service by ID
   */
  getService: async (id: number): Promise<Service> => {
    return get<Service>(`/services/services/${id}/`);
  },

  /**
   * Get all test preparations
   */
  getTestPreparations: async (options?: RequestOptions): Promise<TestPreparation[]> => {
    return get<TestPreparation[]>('/services/test-preparations/', options);
  },

  /**
   * Get a single test preparation by ID
   */
  getTestPreparation: async (id: number): Promise<TestPreparation> => {
    return get<TestPreparation>(`/services/test-preparations/${id}/`);
  },
};

// ============================================================================
// Testimonials API Services
// ============================================================================

export const testimonialsService = {
  /**
   * Get all testimonials (paginated)
   */
  getTestimonials: async (options?: RequestOptions): Promise<PaginatedResponse<Testimonials> | Testimonials[]> => {
    return get<PaginatedResponse<Testimonials> | Testimonials[]>('/testimonials/testimonials/', options);
  },

  /**
   * Get a single testimonial by ID
   */
  getTestimonial: async (id: number): Promise<Testimonials> => {
    return get<Testimonials>(`/testimonials/testimonials/${id}/`);
  },

  /**
   * Get all success stories (paginated)
   */
  getSuccessStories: async (options?: RequestOptions): Promise<PaginatedResponse<SuccessStory> | SuccessStory[]> => {
    return get<PaginatedResponse<SuccessStory> | SuccessStory[]>('/testimonials/success-stories/', options);
  },

  /**
   * Get a single success story by ID
   */
  getSuccessStory: async (id: number): Promise<SuccessStory> => {
    return get<SuccessStory>(`/testimonials/success-stories/${id}/`);
  },
};

// ============================================================================
// Combined API Service Export
// ============================================================================

/**
 * Main API service object containing all service modules
 */
export const apiService = {
  about: aboutService,
  blog: blogService,
  contact: contactService,
  destinations: destinationsService,
  faq: faqService,
  gallery: galleryService,
  home: homeService,
  news: newsService,
  resources: resourcesService,
  services: servicesService,
  testimonials: testimonialsService,
};

// ============================================================================
// Default Export
// ============================================================================

export default apiService;

