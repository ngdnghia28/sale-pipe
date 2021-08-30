import { RolesBuilder } from "nest-access-control";
import { Resources, Roles } from "./shared/constant";

const allResources = [Resources.COUNTRIES, Resources.LANGUAGES, Resources.INDUSTRIES, Resources.USER_PROFILES, Resources.COMPANY_PROFILES]
const publicResources = [Resources.COUNTRIES, Resources.LANGUAGES, Resources.INDUSTRIES];

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(Roles.USER)
  .readAny(publicResources)
  .createOwn(Resources.USER_PROFILES)
  .updateOwn(Resources.USER_PROFILES)
  .readOwn(Resources.USER_PROFILES)
  .grant(Roles.HIRER)
  .extend(Roles.USER)
  .createOwn(Resources.COMPANY_PROFILES)
  .updateOwn(Resources.COMPANY_PROFILES)
  .readAny(Resources.USER_PROFILES)
  .grant(Roles.ADMIN)
  .createAny(publicResources)
  .readAny(allResources)
  .deleteAny(allResources);