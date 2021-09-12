import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  SerializeOptions,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseRoles } from 'nest-access-control';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Actions, Resources } from 'src/shared/constant';
import {
  ApiPageResponse,
  createPageResponse,
  PageQuery,
  PageResponse,
} from 'src/shared/paging';
import { User } from 'src/users/entities/user.entity';
import {
  CreateMyUserProfileDto,
  CreateUserProfileDto,
} from './dto/create-user-profile.dto';
import { UpdateAvailableUserProfileDto } from './dto/update-available-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfile } from './entities/user-profile.entity';
import { UserProfilesService } from './user-profiles.service';

@ApiTags('UserProfiles')
@Controller('user-profiles')
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) {}

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
  createMyProfile(
    @Body() createUserProfileDto: CreateMyUserProfileDto,
    @CurrentUser() user: User,
  ) {
    return this.userProfilesService.create({
      userId: user.id,
      ...createUserProfileDto,
    });
  }

  @ApiPageResponse(UserProfile)
  @UseRoles({
    resource: Resources.USER_PROFILES,
    action: Actions.READ,
    possession: 'any',
  })
  @Get()
  async findAll(@Query() query: PageQuery): Promise<PageResponse<UserProfile>> {
    const result = await this.userProfilesService.findAll({
      ...query,
      where: {
        isVerified: true,
        isAvailable: true,
      },
    });

    return createPageResponse(query, result);
  }

  @SerializeOptions({
    groups: ['owner'],
  })
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('my')
  updateMyProfile(
    @Body() updateUserProfileDto: UpdateUserProfileDto,
    @CurrentUser() user: User,
  ) {
    return this.userProfilesService.updateByUserId(
      user.id,
      updateUserProfileDto,
    );
  }

  @UseRoles({
    resource: Resources.USER_PROFILES,
    action: Actions.UPDATE,
    possession: 'own',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('my/status')
  setAvailable(
    @CurrentUser() user: User,
    @Body() dto: UpdateAvailableUserProfileDto,
  ) {
    return this.userProfilesService.setAvailableByUser(
      user.id,
      dto.isAvailable,
    );
  }

  @UseRoles({
    resource: Resources.USER_PROFILES,
    action: Actions.UPDATE,
    possession: 'any',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  verifiedProfile(@Param('id') id: string) {
    return this.userProfilesService.verifiedProfile(id);
  }

  @UseRoles({
    resource: Resources.USER_PROFILES,
    action: Actions.UPDATE,
    possession: 'any',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    return this.userProfilesService.update(id, updateUserProfileDto);
  }

  @UseRoles({
    resource: Resources.USER_PROFILES,
    action: Actions.DELETE,
    possession: 'any',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userProfilesService.remove(id);
  }
}
