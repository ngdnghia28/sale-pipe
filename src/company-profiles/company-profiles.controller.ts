import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ACGuard, UseRoles } from 'nest-access-control';
import { Public } from 'src/auth/decorators/public.decorator';
import { Actions, Resources } from 'src/shared/constant';
import { CompanyProfilesService } from './company-profiles.service';
import { CreateCompanyProfileDto } from './dto/create-company-profile.dto';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';

@ApiTags("CompanyProfiles")
@Controller('company-profiles')
export class CompanyProfilesController {
  constructor(private readonly companyProfilesService: CompanyProfilesService) { }

  @UseRoles({
    resource: Resources.COMPANY_PROFILES,
    action: Actions.CREATE,
    possession: 'any',
  })
  @Post()
  create(@Body() createCompanyProfileDto: CreateCompanyProfileDto) {
    return this.companyProfilesService.create(createCompanyProfileDto);
  }

  @UseRoles({
    resource: Resources.COMPANY_PROFILES,
    action: Actions.READ,
    possession: 'any',
  })
  @Get()
  findAll() {
    return this.companyProfilesService.findAll();
  }

  @UseRoles({
    resource: Resources.COMPANY_PROFILES,
    action: Actions.READ,
    possession: 'any',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyProfilesService.findOne(id);
  }

  @UseRoles({
    resource: Resources.COMPANY_PROFILES,
    action: Actions.UPDATE,
    possession: 'any',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyProfileDto: UpdateCompanyProfileDto) {
    return this.companyProfilesService.update(id, updateCompanyProfileDto);
  }

  @UseRoles({
    resource: Resources.COMPANY_PROFILES,
    action: Actions.DELETE,
    possession: 'any',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyProfilesService.remove(id);
  }
}
