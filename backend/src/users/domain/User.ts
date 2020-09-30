import { Entity } from '../../common/Entity';
import { UniqueEntityID } from '../../common/UniqueEntityID';

import { RoleEnum } from '../../enums/role.enum';

interface IUserProps {
  email: string;
  password: string,
  firstName?: string | null,
  lastName?: string | null,
  middleName?: string | null,
  role: RoleEnum,
}

export class User extends Entity<IUserProps> {
  get role(): RoleEnum {
    return this.props.role;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get firstName(): string | null | undefined {
    return this.props.firstName;
  }

  get lastName(): string | null | undefined {
    return this.props.lastName;
  }

  get middleName(): string | null | undefined {
    return this.props.middleName;
  }

  private constructor(props: IUserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  getName() {
    return `${(this.firstName) || ''} ${(this.middleName) || ''} ${(this.lastName) || ''}`.trim();
  }

  public static create(props: IUserProps, id?: UniqueEntityID): User {
    const defaultValues: IUserProps = { ...props };

    const user = new User(defaultValues, id);

    return user;
  }
}
