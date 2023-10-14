import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../product.entity";
import { type } from "os";
import { ReviewCategoryEnum } from "src/seller/model/review.model";
import { Review } from "./review.entity";
@Entity()
export class ReviewReply{
    @PrimaryGeneratedColumn()
    replyId: number;


    @Column()
    replyDetails : string;

    // Many reviewReply to One Review 
    @ManyToOne(() => Review, (review) => review.replies, {onDelete:'CASCADE'}) // onDelete:'SET NULL', 
    reviewId: Review;

    @ManyToOne(() => ReviewReply, (reviewReply) => reviewReply.childReplies, { onDelete: 'CASCADE', nullable: true })
    parentReply: ReviewReply; // The parent reply to which this reply is directed


    // one review can have many reply 
    @OneToMany(() => ReviewReply, (reviewReply) => reviewReply.parentReply, { eager: true, cascade: true })
    childReplies: ReviewReply[]; // One review can have multiple replies
    // Multiple replies to this reply
}