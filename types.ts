interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface DeveloperProfile extends CosmicObject {
  type: 'developer-profile';
  metadata: {
    full_name?: string;
    job_title?: string;
    bio?: string;
    location?: string;
    years_experience?: number;
    profile_image?: {
      url: string;
      imgix_url: string;
    };
    resume?: {
      url: string;
    };
  };
}

export interface Skill extends CosmicObject {
  type: 'skills';
  metadata: {
    skill_name?: string;
    category?: {
      key: string;
      value: string;
    };
    proficiency_level?: {
      key: string;
      value: string;
    };
  };
}

export interface Experience extends CosmicObject {
  type: 'experience';
  metadata: {
    job_title?: string;
    company_name?: string;
    location?: string;
    start_date?: string;
    end_date?: string;
    current_job?: boolean;
    job_description?: string;
    achievements?: string;
  };
}

export interface Project extends CosmicObject {
  type: 'projects';
  metadata: {
    project_name?: string;
    description?: string;
    tech_stack?: string;
    project_type?: {
      key: string;
      value: string;
    };
    live_url?: string;
    github_url?: string;
    project_image?: {
      url: string;
      imgix_url: string;
    };
    status?: {
      key: string;
      value: string;
    };
  };
}

export interface ContactInfo extends CosmicObject {
  type: 'contact-info';
  metadata: {
    email?: string;
    phone?: string;
    linkedin_url?: string;
    github_url?: string;
    twitter_url?: string;
    website_url?: string;
    available_for_work?: boolean;
  };
}

export type SkillCategory = 'languages' | 'frameworks' | 'tools' | 'databases' | 'other';
export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type ProjectStatus = 'completed' | 'in-progress' | 'planned';