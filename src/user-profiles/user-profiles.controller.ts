import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserProfilesService } from './user-profiles.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { UseRoles } from 'nest-access-control';
import { Actions, Resources } from 'src/shared/constant';


@ApiTags('UserProfiles')
@Controller('user-profiles')
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) { }

  @UseRoles({
    resource: Resources.USER_PROFILES,
    action: Actions.CREATE,
    possession: 'any',
  })
  @Post()
  create(@Body() createUserProfileDto: CreateUserProfileDto) {
    return this.userProfilesService.create(createUserProfileDto);
  }

  @UseRoles({
    resource: Resources.USER_PROFILES,
    action: Actions.READ,
    possession: 'any',
  })
  @Get()
  findAll() {
    return this.userProfilesService.findAll();
  }

  @UseRoles({
    resource: Resources.USER_PROFILES,
    action: Actions.READ,
    possession: 'any',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userProfilesService.findOne(id);
  }

  @UseRoles({
    resource: Resources.USER_PROFILES,
    action: Actions.UPDATE,
    possession: 'any',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserProfileDto: UpdateUserProfileDto) {
    return this.userProfilesService.update(id, updateUserProfileDto);
  }

  @UseRoles({
    resource: Resources.USER_PROFILES,
    action: Actions.DELETE,
    possession: 'any',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userProfilesService.remove(id);
  }
}
