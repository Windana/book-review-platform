import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PublicModule } from './public/public.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule,
    PublicModule,
    AuthModule,
    UsersModule,
    BooksModule,
    ReviewsModule,
    PrismaModule,
    CommonModule,
  ],
})
export class AppModule {}
