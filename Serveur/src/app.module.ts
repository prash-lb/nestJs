import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { ReservationModule } from './reservation/reservation.module';
import { Reservation } from './reservation/entities/reservation.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cvrr75ggjchc73bgoj60-a.frankfurt-postgres.render.com',
      port: 5432,
      password: 'Whs2xgYs2H9SfU01ko3I1p4QD2qv2oNX',
      username: 'cinema_postgres_user',
      entities: [User,Reservation],
      database: 'cinema_postgres',
      synchronize: true,
      logging: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },}
    }),
    UserModule,
    AuthModule,
    MoviesModule,
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
