import * as bcrypt from 'bcrypt';
import { IPassword } from './IPassword';

interface IBcryptPasswordProps {
  password: string;
}

export class BcryptPassword implements IPassword {
  private props: IBcryptPasswordProps;

  constructor(props: IBcryptPasswordProps) {
    this.props = props;
  }

  public async getHashedPassword(): Promise<string> {
    const hashedPassword = await bcrypt.hash(this.props.password, 10);

    return hashedPassword;
  }

  public static create(props: IBcryptPasswordProps): BcryptPassword {
    const defaultValues: IBcryptPasswordProps = { ...props };

    const password = new BcryptPassword(defaultValues);

    return password;
  }

  public async compare(password): Promise<boolean> {
    const isEqual = await bcrypt.compare(this.props.password, password);

    return isEqual;
  }
}
