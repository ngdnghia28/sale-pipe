import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserProfilesService } from './user-profiles.service';
import { CreateMyUserProfileDto, CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { ApiTags } from '@nestjs/swagger';
import { UseRoles } from 'nest-access-control';
import { Actions, Resources } from 'src/shared/constant';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';


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
    action: Actions.CREATE,
    possession: 'own',
  })
  @Post('my')
  createMyProfile(@Body() createUserProfileDto: CreateMyUserProfileDto, @CurrentUser() user: User) {
    return this.userProfilesService.create({
      userId: user.id,
      ...createUserProfileDto
    });
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
    possession: 'own',
  })
  @Get('my')
  getMyProfile(@CurrentUser() user: User) {
    return this.userProfilesService.findByUserId(user.id);
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
    possession: 'own',
  })
  @Patch('my')
  updateMyProfile(@Body() updateUserProfileDto: UpdateUserProfileDto, @CurrentUser() user: User) {
    return this.userProfilesService.updateByUserId(user.id, updateUserProfileDto);
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
