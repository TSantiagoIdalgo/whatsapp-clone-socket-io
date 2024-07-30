import { Chat } from "src/components/chat/entities/chat.entity";
import { User } from "src/components/users/entities/user.entity";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

enum MessagesStatus  {
    READ = 'READ',
    SEND = 'SEND',
    PENDING = 'PENDING'
}

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
    message_id: string;

  @Column({ type: 'varchar', nullable: false })
    content: string

  @Column({ type: 'time with time zone' })
    createdAt: Date
  
  @ManyToOne(() => User, user => user.email)
    user: User

  @Column({ type: 'boolean' })
    deleted: boolean;
  
  @Column({ type: 'varchar', enum: MessagesStatus })
    status: MessagesStatus

  @ManyToOne(() => Chat, chat => chat.chat_id)
    chat: Chat
}