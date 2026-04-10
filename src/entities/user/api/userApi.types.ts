import { User } from '@/entities/user';

export type SettingsData = {
  profile: {
    name: string;
    jobTitle: string;
    experience: string;
    location: string;
    skills: string[];
    bio: string;
    photo: string;
  };
  jobPreferences: {
    jobType: string[];
    workLocation: string;
    salaryMin: string;
    salaryMax: string;
    industries: string[];
    willingToRelocate: boolean;
  };
  notifications: {
    alerts: {
      jobMatches: boolean;
      applicationUpdates: boolean;
      interviewReminders: boolean;
      careerInsights: boolean;
    };
    notificationStyle: 'push' | 'email' | 'both';
  };
  privacy: {
    showSalaryExpectations: boolean;
    showContactInfo: boolean;
    allowRecruiterMessages: boolean;
  };
  account: {
    email: string;
    language: string;
  };
};

export type UserProfileResponse = {
  user: Omit<User, 'password'>;
  settings: SettingsData;
};

export type UpdateUserProfileRequest = SettingsData;
