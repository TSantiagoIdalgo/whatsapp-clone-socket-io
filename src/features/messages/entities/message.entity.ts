import { Chat } from "src/features/chats/entities/chat.entity";
import { User } from "src/features/users/entities/user.entity";
import { CreateDateColumn, PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";

export type MessageStatus = 'pending' | 'send' | 'read'

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
    id: string;
  @Column({ type: 'text' })
    content: string;
  @CreateDateColumn()
    timestamp: Date;
  @Column({ type: "enum", enum: ['pending', 'send', 'read'] })
    status: MessageStatus
  
  @ManyToOne(() => User, user => user.messages)
    user: User

  @ManyToOne(() => Chat, chat => chat.messages)
    chat: Chat;
}
