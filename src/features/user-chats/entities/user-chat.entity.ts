import { Chat } from "src/features/chats/entities/chat.entity";
import { User } from "src/features/users/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('usersChats')
export class UserChat {
  @PrimaryGeneratedColumn('uuid')
    id: string;
  
  @ManyToOne(() => User, user => user.usersChats)
    user: User;

  @ManyToOne(() => Chat, chat => chat.usersChats)
    chat: Chat
  @CreateDateColumn()
    joinedAt: Date;
}
