import { Entity } from '../../common/Entity';
import { UniqueEntityID } from '../../common/UniqueEntityID';
import { ITokenProps } from '../../types/ITokenProps';

export class Token extends Entity<ITokenProps> {

  get token(): string {
    return this.props.token;
  }

  get userId(): string | null | undefined {
    return this.props.userId;
  }

  get expireAt(): string | null | undefined {
    return this.props.expireAt;
  }

  private constructor(props: ITokenProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ITokenProps, id?: UniqueEntityID): Token {
    const defaultValues: ITokenProps = { ...props };

    return new Token(defaultValues, id);
  }
}
