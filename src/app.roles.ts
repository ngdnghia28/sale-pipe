import { RolesBuilder } from 'nest-access-control';
import { Resources, Roles } from './shared/constant';

const allResources = [
  Resources.COUNTRIES,
  Resources.LANGUAGES,
  Resources.INDUSTRIES,
  Resources.USER_PROFILES,
  Resources.COMPANY_PROFILES,
  Resources.CONTRACTS,
  Resources.CONTRACT_TERMS,
];
const publicResources = [
  Resources.COUNTRIES,
  Resources.LANGUAGES,
  Resources.INDUSTRIES,
];

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(Roles.USER)
  .createOwn(Resources.USER_PROFILES)
  .updateOwn(Resources.USER_PROFILES)
  .readOwn(Resources.USER_PROFILES)
  .readOwn(Resources.CONTRACTS)
  .updateOwn(Resources.CONTRACTS)
  .readOwn(Resources.CONTRACT_TERMS)
  .updateOwn(Resources.CONTRACT_TERMS)

  .grant(Roles.HIRER)
  .createOwn(Resources.COMPANY_PROFILES)
  .updateOwn(Resources.COMPANY_PROFILES)
  .readAny(Resources.USER_PROFILES)
  .createOwn(Resources.CONTRACTS)
  .readOwn(Resources.CONTRACTS)
  .updateOwn(Resources.CONTRACTS)
  .deleteOwn(Resources.CONTRACTS)
  .createOwn(Resources.CONTRACT_TERMS)
  .readOwn(Resources.CONTRACT_TERMS)
  .updateOwn(Resources.CONTRACT_TERMS)
  .deleteOwn(Resources.CONTRACT_TERMS)

  .grant(Roles.ADMIN)
  .createAny(publicResources)
  .updateAny(publicResources)
  .deleteAny(allResources)
  .updateAny([Resources.USER_PROFILES])
  .readAny(allResources);
