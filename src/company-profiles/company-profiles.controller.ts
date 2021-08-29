import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { CompanyProfilesService } from './company-profiles.service';
import { CreateCompanyProfileDto } from './dto/create-company-profile.dto';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';

@ApiTags("CompanyProfiles")
@Public()
@Controller('company-profiles')
export class CompanyProfilesController {
  constructor(private readonly companyProfilesService: CompanyProfilesService) { }

  @Post()
  create(@Body() createCompanyProfileDto: CreateCompanyProfileDto) {
    return this.companyProfilesService.create(createCompanyProfileDto);
  }

  @Get()
  findAll() {
    return this.companyProfilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyProfilesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyProfileDto: UpdateCompanyProfileDto) {
    return this.companyProfilesService.update(id, updateCompanyProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyProfilesService.remove(id);
  }
}
