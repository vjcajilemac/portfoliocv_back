import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'Pa$$word',
      username: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      database: 'portfolio_db',
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
