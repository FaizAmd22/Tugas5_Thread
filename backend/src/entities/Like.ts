import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Thread } from "./Thread";
import { Reply } from "./Reply";

@Entity({ name: "likes" })
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Thread, (thread) => thread.likes, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    thread: Thread;

    @ManyToOne(() => Reply, (reply) => reply.likes, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    reply: Reply;

    @ManyToOne(() => User, (user) => user.likes, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    author: User;
}
