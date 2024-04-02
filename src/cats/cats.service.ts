import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

const catNotFound = (id: number) => `Cat with id ${id} not found`;

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  create(createCatDto: CreateCatDto) {
    const cat = {
      id: this.cats[this.cats.length - 1]?.id + 1 || 1, // [1]
      ...createCatDto,
    };
    this.cats.push(cat);
    return cat;
  }

  findAll() {
    return this.cats;
  }

  findOne(id: number) {
    const cat = this.cats.filter((cat) => cat.id === id)[0];
    if (cat) {
      return cat;
    } else {
      throw new NotFoundException(catNotFound(id));
    }
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    const cat = this.cats.filter((cat) => cat.id === id)[0];
    if (cat) {
      const catUpdated = { ...cat, ...updateCatDto };
      this.cats = this.cats.map((cat) => (cat.id === id ? catUpdated : cat));
      return catUpdated;
    } else {
      throw new NotFoundException(catNotFound(id));
    }
  }

  remove(id: number) {
    const cat = this.cats.filter((cat) => cat.id === id)[0];
    if (!cat) {
      throw new NotFoundException(catNotFound(id));
    }
    this.cats = this.cats.filter((cat) => cat.id !== id);
    return cat;
  }
}
