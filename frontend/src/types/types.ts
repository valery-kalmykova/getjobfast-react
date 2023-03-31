export type TVacancy = {
  id: string;
  premium: boolean;
  name: string;
  has_test: boolean;
  response_letter_required: boolean;
  area: { id: string; name: string; url: string };
  salary: { from: number; to: number; currency: string; gross: boolean };
  type: { id: string; name: string };
  address?: string | null;
  response_url?: string | null;
  sort_point_distance?: string | null;
  published_at: string;
  created_at: string;
  archived: boolean;
  apply_alternate_url: string;
  insider_interview?: boolean | null;
  url: string;
  adv_response_url: string;
  alternate_url: string;
  relations: [];
  employer: {
    id: string;
    name: string;
    url: string;
    alternate_url: string;
    logo_urls: {
      90: string;
      240: string;
      original: string;
    };
    vacancies_url: string;
    trusted: boolean;
  };
  snippet?: {
    requirement: string;
    responsibility: string;
  };
  contacts?: {};
  schedule?: { id: string; name: string };
  working_days?: [];
  working_time_intervals?: [];
  working_time_modes?: [];
  accept_temporary?: boolean;
};

export type TResume = {
  last_name: string;
  first_name: string;
  middle_name: string;
  title: string;
  created_at: string;
  updated_at: string;
  area?: { id: string; name: string; url: string };
  age?: number;
  gender?: { id: string; name: string };
  salary?: number | null;
  photo?: {
    40: string;
    100: string;
    500: string;
    id: string;
    small: string;
    medium: string;
  };
  total_experience?: { months: number };
  certificate?: [];
  hidden_fields?: [];
  actions: {
    download: {
      pdf: {
        url: string;
      };
      rtf: {
        url: string;
      };
    };
  };
  url: string;
  alternate_url: string;
  id: string;
  download: {
    pdf: {
      url: string;
    };
    rtf: {
      url: string;
    };
  };
  education?: {
    level: { id: string; name: string };
    primary: [
      {
        name: string;
        organization: string;
        result: string;
        year: number;
        name_id: string;
        organization_id: string | null;
        result_id: string;
      },
    ];
  };
  experience?: TExperiense[];
};

type TExperiense = {
  start?: string;
  end?: string | null;
  company?: string;
  company_id?: string;
  industry?: string | null;
  industries?: [{ id: string; name: string }];
  area?: { id: string; name: string; url: string };
  company_url?: string;
  employer?: {
    id: string;
    name: string;
    url: string;
    alternate_url: string;
    logo_urls: { 90: string };
  };
  position?: string;
};

export type TUser = {
  auth_type: string;
  is_applicant: boolean;
  is_employer: boolean;
  is_admin: boolean;
  is_application: boolean;
  id: string;
  is_anonymous: boolean;
  email: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  resumes_url: string;
  negotiations_url: string;
  is_in_search: boolean;
  mid_name?: string;
  employer?: string | boolean | null;
  personal_manager?: string | boolean | null;
  manager?: string | boolean | null;
  phone: string;
  counters: { new_resume_views: number; unread_negotiations: number; resumes_count: number };
  profile_videos: { items: [] };
};
