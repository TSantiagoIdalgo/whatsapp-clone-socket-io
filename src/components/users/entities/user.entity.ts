import { Chat } from 'src/components/chat/entities/chat.entity';
import { Message } from 'src/components/messages/entities/message.entity';
import { UserSetting } from 'src/components/user-setting/entities/user-setting.entity';
import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn } from 'typeorm'


@Entity()
export class User {
  @Column({ unique: true })
    userName: string;

  @PrimaryColumn({ unique: true, nullable: false })
    email: string;

  @Column()
    password: string;

  @ManyToMany(() => Chat, chat => chat.chat_id)
  @JoinTable()
    chats: Chat[]

  @OneToMany(() => Message, message => message.message_id, { cascade: true })
    messages: Message[]

  @OneToOne(() => UserSetting, user_setting => user_setting.user)
  @JoinColumn()
    settings: UserSetting;

}
