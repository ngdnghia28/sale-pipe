import { UserType } from "src/users/user.entity";

export class SignUpDto {
  type: UserType;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isActive?: boolean;
}