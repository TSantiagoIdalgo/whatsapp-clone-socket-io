import { Message } from 'src/components/messages/entities/message.entity';
import { User } from 'src/components/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
    chat_id: string;
  @Column({ nullable: false })
    name: string;

  @ManyToMany(() => User, user => user.email)
    users: User[]
  @OneToMany(() => Message, message => message.message_id)
    messages: Message[]
}
