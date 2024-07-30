import { User } from "src/components/users/entities/user.entity";
import { Entity, Column, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserSetting {
  @PrimaryGeneratedColumn('uuid')
    setting_id: string
  @Column({ type: 'boolean', default: false })
    notification_enable: boolean;

  @Column({ type: 'varchar', default: 'light' })
    theme: 'light' | 'dark'

  @Column({ type: 'varchar' })
    lenguage: string;
  @Column({ type: 'varchar' })
    privacy_setting: string;
  @Column({ type: 'time with time zone' })
    createdAt: Date;
  @Column({ type: 'time with time zone' })
    updatedAt: Date;
  @OneToOne(() => User, user => user.email)
    user: User;
}

