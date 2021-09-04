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
import { UseRoles } from 'nest-access-control';
import { Actions, Resources } from 'src/shared/constant';
import { ContractTermsService } from './contract-terms.service';
import { CreateContractTermDto } from './dto/create-contract-term.dto';
import { UpdateContractTermDto } from './dto/update-contract-term.dto';

@Controller('contracts/:contractId/terms')
export class ContractTermsController {
  constructor(private readonly contractTermsService: ContractTermsService) { }

  @UseRoles({
    resource: Resources.CONTRACT_TERMS,
    action: Actions.CREATE,
    possession: 'own',
  })
  @Post()
  create(
    @Param('contractId') contractId: string,
    @Body() createContractTermDto: CreateContractTermDto,
  ) {
    return this.contractTermsService.create(createContractTermDto);
  }

  @UseRoles({
    resource: Resources.CONTRACT_TERMS,
    action: Actions.READ,
    possession: 'own',
  })
  @Get()
  findAll(@Param('contractId') contractId: string,) {
    return this.contractTermsService.findAll();
  }

  @UseRoles({
    resource: Resources.CONTRACT_TERMS,
    action: Actions.READ,
    possession: 'own',
  })
  @Get(':id')
  findOne(@Param('contractId') contractId: string, @Param('id') id: string) {
    return this.contractTermsService.findOne(+id);
  }

  @UseRoles({
    resource: Resources.CONTRACT_TERMS,
    action: Actions.UPDATE,
    possession: 'own',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  update(
    @Param('contractId') contractId: string,
    @Param('id') id: string,
    @Body() updateContractTermDto: UpdateContractTermDto,
  ) {
    return this.contractTermsService.update(+id, updateContractTermDto);
  }

  @UseRoles({
    resource: Resources.CONTRACT_TERMS,
    action: Actions.DELETE,
    possession: 'own',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('contractId') contractId: string, @Param('id') id: string) {
    return this.contractTermsService.remove(+id);
  }
}
