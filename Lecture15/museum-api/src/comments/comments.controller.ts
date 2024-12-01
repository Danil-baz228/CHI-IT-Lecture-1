import {
    Controller,
    Post,
    Get,
    Delete,
    Param,
    Body,
    UseGuards,
    Request,
    Logger,
  } from '@nestjs/common';
  import { CommentsService } from './comments.service';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
  
  @Controller('exhibits/:exhibitId/comments')
  export class CommentsController {
    private readonly logger = new Logger(CommentsController.name);
  
    constructor(private readonly commentsService: CommentsService) {}
  
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
      @Param('exhibitId') exhibitId: number,
      @Body('content') content: string,
      @Request() req: any,
    ) {
      this.logger.log(`User ID from request: ${req.user.userId}`);
      return this.commentsService.create(content, req.user.userId, exhibitId);
    }
  }
  