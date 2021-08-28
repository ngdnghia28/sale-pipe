import { Industry } from "src/industries/entities/industry.entity";
import { Language } from "src/languages/entities/language.entity";

export class CreateUserProfileDto {
  userId: string;
  phone: string;
  email: string;
  rate: string;
  hours_per_week: number;
  avatar?: string;
  headline: string;
  bio: string;
  countryId: string;
  languages: Language[];
  yose: number;
  industries: Industry[];
}
