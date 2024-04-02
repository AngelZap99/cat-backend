import { Module } from '@nestjs/common';
// Modules
import { CatsModule } from './cats/cats.module';
// Controllers

// Services

@Module({
  imports: [CatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
