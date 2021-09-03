import { Module } from '@nestjs/common';
import { CompanyProfilesService } from './company-profiles.service';
import { CompanyProfilesController } from './company-profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyProfile } from './entities/company-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyProfile])],
  controllers: [CompanyProfilesController],
  providers: [CompanyProfilesService],
})
export class CompanyProfilesModule {}
