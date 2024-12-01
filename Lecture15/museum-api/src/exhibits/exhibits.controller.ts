import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ExhibitsService } from './exhibits.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path'; 
import { v4 as uuidv4 } from 'uuid'; 

@Controller('exhibits')
export class ExhibitsController {
  constructor(private readonly exhibitsService: ExhibitsService) {}

  @Post()
  async createExhibit(@Body('description') description: string, @Body('userId') userId: number) {
    return this.exhibitsService.createExhibit(description, userId);
  }

  @Get()
  async getAllExhibits() {
    return this.exhibitsService.getAllExhibits();
  }

  @Get(':id')
  async getExhibitById(@Param('id') id: number) {
    return this.exhibitsService.getExhibitById(id);
  }

  @Delete(':id')
  async deleteExhibit(@Param('id') id: number) {
    await this.exhibitsService.deleteExhibit(id);
    return { message: 'Exhibit deleted successfully' };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadExhibit(
    @UploadedFile() file: any,
    @Body('description') description: string,
    @Body('userId') userId: number,
  ) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
    const filePath = path.join(__dirname, '../../uploads', uniqueFileName);

    
    const fs = require('fs');
    if (!fs.existsSync(path.join(__dirname, '../../uploads'))) {
      fs.mkdirSync(path.join(__dirname, '../../uploads')); 
    }
    fs.writeFileSync(filePath, file.buffer);

    return this.exhibitsService.create({
      description,
      userId,
      imagePath: uniqueFileName,
    });
  }
}
