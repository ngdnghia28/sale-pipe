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
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) { }

  @UseRoles({
    resource: Resources.CONTRACTS,
    action: Actions.CREATE,
    possession: 'own',
  })
  @Post()
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractsService.create(createContractDto);
  }

  @UseRoles({
    resource: Resources.CONTRACTS,
    action: Actions.READ,
    possession: 'any',
  })
  @Get()
  findAll() {
    return this.contractsService.findAll();
  }

  @UseRoles({
    resource: Resources.CONTRACTS,
    action: Actions.READ,
    possession: 'own',
  })
  @Get('my')
  getMyContracts() {
    return this.contractsService.findAll();
  }

  @UseRoles({
    resource: Resources.CONTRACTS,
    action: Actions.READ,
    possession: 'any',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractsService.findOne(id);
  }

  @UseRoles({
    resource: Resources.CONTRACTS,
    action: Actions.UPDATE,
    possession: 'own',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractDto,
  ) {
    return this.contractsService.update(id, updateContractDto);
  }

  @UseRoles({
    resource: Resources.CONTRACTS,
    action: Actions.DELETE,
    possession: 'own',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractsService.remove(id);
  }
}
