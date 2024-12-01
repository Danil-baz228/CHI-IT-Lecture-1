import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './comment.entity';
import { WebsocketModule } from '../websocket/websocket.module';
@Module({
    imports: [TypeOrmModule.forFeature([Comment]), WebsocketModule],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
