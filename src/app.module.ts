import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from './config/env';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [NotesModule, MongooseModule.forRoot(env.MONGODB_URI), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
