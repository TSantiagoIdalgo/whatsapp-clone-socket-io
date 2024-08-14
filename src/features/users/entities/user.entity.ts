import { Call } from "src/features/calls/entities/call.entity";
import { Message } from "src/features/messages/entities/message.entity";
import { UserChat } from "src/features/user-chats/entities/user-chat.entity";
import { UserSetting } from "src/features/user-settings/entities/user-setting.entity";
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";

@Entity('users')
export class User {
  @Column('varchar', { length: 50, nullable: false })
    username: string;
  @PrimaryColumn('varchar', { unique: true, nullable: false, length: 50 })
    email: string;
  @Column('varchar', { nullable: false, length: 150 })
    password: string;
  @Column('boolean', { default: false })
    verify: boolean

  
  @OneToOne(() => UserSetting)
  @JoinColumn()
    userSetings: UserSetting
  
  @OneToMany(() => Message, message => message.user)
    messages: Message[]

  @OneToMany(() => Call, call => call.user)
    calls: Call[]


  @OneToMany(() => UserChat, userChat => userChat.user)
    usersChats: UserChat[]
}
