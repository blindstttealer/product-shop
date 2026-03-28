import { object, string, array, boolean, InferType } from 'yup';
import { experienceOptions, languageOptions, notificationOptions } from '@/pages/settings/mocks';

export const SkillsData = [
  'JavaScript',
  'Python',
  'Java',
  'React',
  'Node.js',
  'SQL',
  'Управление проектами',
  'Анализ данных',
  'Маркетинг',
];

export const EmploymentTypesData = [
  'Полная занятость',
  'Частичная занятость',
  'Контракт',
  'Фриланс',
  'Стажировка',
];

export const PreferredIndustriesData = [
  'Технологии',
  'Здравоохранение',
  'Финансы',
  'Образование',
  'Маркетинг',
  'Продажи',
  'Розничная торговля',
  'Производство',
  'Гостиничный бизнес',
  'Консалтинг',
];

export const LocationOptionsData = ['Москва', 'Санкт-Петербург', 'Омск'];

export const WorkFormatOptionsData = ['Только удаленно', 'Только в офисе', 'Гибридный формат'];

const NotificationStyleData = ['push', 'email', 'both'];
const LanguageOptionsData = ['ru', 'en', 'es'];
const ExperienceOptionsData = ['0-1', '1-3', '3-5', '5-10', '10+'];

export const profileSettingsSchema = object({
  profile: object({
    name: string().required('Укажите имя'),
    jobTitle: string(),
    experience: string().oneOf(experienceOptions.map((el) => el.value)),
    location: string().oneOf(LocationOptionsData),
    skills: array().of(string().oneOf(SkillsData)),
    bio: string(),
    photo: string(),
  }),
  jobPreferences: object({
    jobType: array().of(string().oneOf(EmploymentTypesData)),
    workLocation: string().oneOf(WorkFormatOptionsData),
    salaryMin: string(),
    salaryMax: string(),
    industries: array().of(string().oneOf(PreferredIndustriesData)),
    willingToRelocate: boolean(),
  }),
  notifications: object({
    alerts: object({
      jobMatches: boolean(),
      applicationUpdates: boolean(),
      interviewReminders: boolean(),
      careerInsights: boolean(),
    }),
    notificationStyle: string().oneOf(notificationOptions.map((el) => el.value)),
  }),
  privacy: object({
    showSalaryExpectations: boolean(),
    showContactInfo: boolean(),
    allowRecruiterMessages: boolean(),
  }),
  account: object({
    email: string().required('Введите email').email('Введите корректный email'),
    language: string().oneOf(languageOptions.map((el) => el.value)),
  }),
});

export type ProfileSettingsData = InferType<typeof profileSettingsSchema>;
