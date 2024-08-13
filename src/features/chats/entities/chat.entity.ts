import { Call } from "src/features/calls/entities/call.entity";
import { Message } from "src/features/messages/entities/message.entity";
import { UserChat } from "src/features/user-chats/entities/user-chat.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
    id: string;
  @Column('varchar', { nullable: false, length: 50 })
    title: string;
  @Column('varchar', { nullable: true })
    photo: string;
  @CreateDateColumn()
    created_at: Date

  @OneToMany(() => UserChat, usersChat => usersChat.chat)
    usersChats: UserChat

  @OneToMany(() => Message, message => message.chat)
    messages: Message[]

  @OneToMany(() => Call, call => call.chat)
    calls: Call[]
}
