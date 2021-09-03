import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseRoles } from 'nest-access-control';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Actions, Resources } from 'src/shared/constant';
import { User } from 'src/users/user.entity';
import { CompanyProfilesService } from './company-profiles.service';
import {
  CreateCompanyProfileDto,
  CreateMyCompanyProfileDto,
} from './dto/create-company-profile.dto';
import {
  UpdateCompanyProfileDto,
  UpdateMyCompanyProfileDto,
} from './dto/update-company-profile.dto';

@ApiTags('CompanyProfiles')
@Controller('company-profiles')
export class CompanyProfilesController {
  constructor(
    private readonly companyProfilesService: CompanyProfilesService,
  ) {}

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
    action: Actions.CREATE,
    possession: 'own',
  })
  @Post('my')
  createMyProfile(
    @Body() createCompanyProfileDto: CreateMyCompanyProfileDto,
    @CurrentUser() user: User,
  ) {
    return this.companyProfilesService.create({
      userId: user.id,
      ...createCompanyProfileDto,
    });
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
    possession: 'own',
  })
  @Get('my')
  getMyProfile(@CurrentUser() user: User) {
    return this.companyProfilesService.findByUserId(user.id);
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
    possession: 'own',
  })
  @Patch('my')
  updateMyProfile(
    @CurrentUser() user: User,
    @Body() updateCompanyProfileDto: UpdateMyCompanyProfileDto,
  ) {
    return this.companyProfilesService.updateByUserId(
      user.id,
      updateCompanyProfileDto,
    );
  }

  @UseRoles({
    resource: Resources.COMPANY_PROFILES,
    action: Actions.UPDATE,
    possession: 'any',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompanyProfileDto: UpdateCompanyProfileDto,
  ) {
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
