import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exhibit } from './exhibit.entity';

@Injectable()
export class ExhibitsService {
  constructor(
    @InjectRepository(Exhibit)
    private exhibitRepository: Repository<Exhibit>,
  ) {}

  async createExhibit(description: string, userId: number): Promise<Exhibit> {
    console.log('Creating exhibit with description:', description, 'and userId:', userId);
  
    try {
      const exhibit = this.exhibitRepository.create({ description, userId });
      return await this.exhibitRepository.save(exhibit);
    } catch (error) {
      console.error('Error creating exhibit:', error);
      throw new Error('Failed to create exhibit');
    }
  }
  
  async create(data: Partial<Exhibit>): Promise<Exhibit> {
    const exhibit = this.exhibitRepository.create(data);
    return this.exhibitRepository.save(exhibit);
  }

  async getAllExhibits(): Promise<Exhibit[]> {
    return this.exhibitRepository.find();
  }

  async getExhibitById(id: number): Promise<Exhibit> {
    return this.exhibitRepository.findOne({ where: { id } });
  }

  async deleteExhibit(id: number): Promise<void> {
    await this.exhibitRepository.delete(id);
  }
}
