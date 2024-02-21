import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: "follows" })
export class Follow {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.follower, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    follower: User;

    @ManyToOne(() => User, (user) => user.following, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    following: User;
}
