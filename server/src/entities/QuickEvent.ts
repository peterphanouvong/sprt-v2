import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class QuickEvent extends BaseEntity {
  /**
   * Fields
   */

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  title!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  capacity: number;

  @Field(() => String)
  @Column({ default: "[]" })
  users!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  // @Field(() => String)
  // @Column({ nullable: true })
  // bannerImageUrl: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  youtubeURL: string;
}
