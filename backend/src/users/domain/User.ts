import { Entity } from '../../common/Entity';
import { UniqueEntityID } from '../../common/UniqueEntityID';

import { IUserProps } from '../../types/IUserProps';

export class User extends Entity<IUserProps> {
  get email(): string {
    return this.props.email;
  }

  get role(): string {
    return this.props.role;
  }

  get firstName(): string | null | undefined {
    return this.props.firstName;
  }

  get lastName(): string | null | undefined {
    return this.props.lastName;
  }

  get password(): string {
    return this.props.password;
  }

  get status(): string {
    return this.props.status;
  }

  private constructor(props: IUserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: IUserProps, id?: UniqueEntityID): User {
    const defaultValues: IUserProps = { ...props };

    const user = new User(defaultValues, id);

    return user;
  }
}
