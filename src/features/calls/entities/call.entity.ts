import { Chat } from "src/features/chats/entities/chat.entity";
import { User } from "src/features/users/entities/user.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";

export type CallStatus = 'rejected' | 'accepted' | 'unattended'

@Entity('calls')
export class Call {
  @PrimaryGeneratedColumn('uuid')
    id: string;
  @Column({ type: 'integer' })
    start_time: number;
  @Column({ type: 'integer' })
    end_time: number;
  @Column({ type: 'integer' })
    duration: number;
  @Column({ type: 'enum', enum: ['rejected', 'accepted', 'unattended']})
    status: CallStatus

  @ManyToOne(() => User, user => user.calls)
    user: User;

  @ManyToOne(() => Chat, chat => chat.calls)
    chat: Chat;
}
