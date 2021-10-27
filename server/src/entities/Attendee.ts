import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EventAttendee } from "./EventAttendee";

@ObjectType()
@Entity()
export class Attendee extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ nullable: true })
  firstname!: string;

  @Field(() => String)
  @Column({ nullable: true })
  lastname!: string;

  @Field(() => String)
  @Column({ nullable: true })
  email?: string;

  @Field(() => Number)
  @Column({ unique: true })
  phoneNumber!: number;

  @Field(() => String)
  @Column()
  beemId!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => EventAttendee, (ca) => ca.attendee)
  eventConnection: EventAttendee[];
}
