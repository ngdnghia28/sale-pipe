/* eslint-disable @typescript-eslint/no-unused-vars */
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class countriesLanguagesSeedData1630225137869
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository('countries').save([
      {
        code: 'af',
        name: 'Afghanistan',
      },
      {
        code: 'al',
        name: 'Albania',
      },
      {
        code: 'ag',
        name: 'Algeria',
      },
      {
        code: 'mx',
        name: 'Mexico',
      },
    ]);

    await getRepository('languages').save([
      {
        code: 'en',
        name: 'English',
      },
      {
        code: 'ko',
        name: 'Korean',
      },
      {
        code: 'fr',
        name: 'French',
      },
    ]);

    await getRepository('industries').save([
      {
        code: 'mkt',
        name: 'Marketing',
      },
      {
        code: 'sam',
        name: 'Sale manager',
      },
      {
        code: 'Su',
        name: 'Customer support',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
