CREATE TABLE "users" (
  "name" varchar PRIMARY KEY,
  "email" varchar UNIQUE,
  "userName" varchar(20),
  "password" varchar
);

CREATE TABLE "userConfiguration" (
  "setting_id" uuid PRIMARY KEY,
  "user_id" varchar,
  "settings" jsonb
);

CREATE TABLE "messages" (
  "id" uuid PRIMARY KEY,
  "chat_id" uuid,
  "user_id" varchar,
  "content" text,
  "message_type_id" uuid,
  "timestamp" timestamp,
  "status" varchar
);

CREATE TABLE "calls" (
  "id" uuid PRIMARY KEY,
  "user_id" varchar,
  "chat_id" uuid,
  "start_time" timestamp,
  "end_time" timestamp,
  "duration" int,
  "status" varchar,
  "message_type_id" uuid
);

CREATE TABLE "chats" (
  "id" uuid PRIMARY KEY,
  "title" varchar,
  "photo" varchar,
  "created_at" timestamp
);

CREATE TABLE "usersChats" (
  "user_id" varchar,
  "chat_id" uuid,
  "joined_at" timestamp
);

CREATE TABLE "messageTypes" (
  "id" uuid PRIMARY KEY,
  "type_name" varchar
);

ALTER TABLE "userConfiguration" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("email");

ALTER TABLE "messages" ADD FOREIGN KEY ("chat_id") REFERENCES "chats" ("id");

ALTER TABLE "messages" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("email");

ALTER TABLE "messages" ADD FOREIGN KEY ("message_type_id") REFERENCES "messageTypes" ("id");

ALTER TABLE "calls" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("email");

ALTER TABLE "calls" ADD FOREIGN KEY ("chat_id") REFERENCES "chats" ("id");

ALTER TABLE "calls" ADD FOREIGN KEY ("message_type_id") REFERENCES "messageTypes" ("id");

ALTER TABLE "usersChats" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("email");

ALTER TABLE "usersChats" ADD FOREIGN KEY ("chat_id") REFERENCES "chats" ("id");
