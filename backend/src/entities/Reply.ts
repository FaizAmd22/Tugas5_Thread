import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Like } from "./Like";
import { Thread } from "./Thread";

@Entity({ name: "replies" })
export class Reply {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 160, nullable: true })
    content: string;

    @Column({ nullable: true })
    image: string;

    @ManyToOne(() => Thread, (thread) => thread.replies, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    thread: Thread
        
    @ManyToOne(() => Reply, (reply) => reply.replies, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    reply: Reply

    @OneToMany(() => Like, (like) => like.reply)
    likes: Like[];

    @OneToMany(() => Reply, (reply) => reply.reply)
    replies: Reply[]

    @ManyToOne(() => User, (user) => user.id, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    author: User

    @Column({ default: () => "NOW()" })
    created_at: Date;
}
