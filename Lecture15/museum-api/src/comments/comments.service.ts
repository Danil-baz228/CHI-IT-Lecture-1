import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { WebsocketGateway } from '../websocket/websocket.gateway';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        private websocketGateway: WebsocketGateway,
      ) {}

  async create(content: string, userId: number, exhibitId: number): Promise<Comment> {
    console.log('Creating comment with data:', { content, userId, exhibitId });
    try {
      const comment = this.commentRepository.create({ content, userId, exhibitId });
      const savedComment = await this.commentRepository.save(comment);
      console.log('Saved comment:', savedComment);

      
      this.websocketGateway.server.emit('newComment', savedComment);

      return savedComment;
    } catch (error) {
      console.error('Error while creating comment:', error);
      throw new Error('Failed to create comment');
    }
  }
  
  
  

  async findAllByExhibit(exhibitId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { exhibitId },
      relations: ['user'], 
    });
  }

  async delete(commentId: number): Promise<void> {
    await this.commentRepository.delete(commentId);
  }
}
