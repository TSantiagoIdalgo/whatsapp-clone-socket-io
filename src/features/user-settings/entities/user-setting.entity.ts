import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('userSettings')
export class UserSetting {
  @PrimaryGeneratedColumn('uuid')
    setting_id: string;
  @Column({ type: 'jsonb' })
    settings: Record<string, string>

}
