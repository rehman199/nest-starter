import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }

  async authenticatePassword(pass: string) {
    return await bcrypt.compare(pass, this.password);
  }

  withoutPassword() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = this;
    return result;
  }
}
