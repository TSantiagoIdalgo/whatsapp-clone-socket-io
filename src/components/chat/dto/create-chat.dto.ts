import { Chat } from "../entities/chat.entity";

type UserCreateDTO = Pick<Chat, 'name'>

export class CreateChatDto implements UserCreateDTO {
  name: string;
}
