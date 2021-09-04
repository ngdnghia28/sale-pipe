import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseRoles } from 'nest-access-control';
import { Public } from 'src/auth/decorators/public.decorator';
import { Actions, Resources } from 'src/shared/constant';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @UseRoles({
    resource: Resources.COUNTRIES,
    action: Actions.CREATE,
    possession: 'any',
  })
  @Post()
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countriesService.create(createCountryDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.countriesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countriesService.findOne(id);
  }

  @UseRoles({
    resource: Resources.COUNTRIES,
    action: Actions.UPDATE,
    possession: 'any',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countriesService.update(id, updateCountryDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseRoles({
    resource: Resources.COUNTRIES,
    action: Actions.DELETE,
    possession: 'any',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countriesService.remove(id);
  }
}
