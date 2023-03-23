import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/api/api.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private apiRepository: ApiService,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    const userByEmail = await this.userModel.findOne({
      where: {
        email: email,
      },
    });
    if (userByEmail) {
      const { id } = userByEmail;
      return await this.userModel.findByIdAndUpdate(id, userByEmail);
    }
    const newUser = await new this.userModel({
      ...createUserDto,
      createdAt: new Date(),
    }).save();
    return newUser;
  }

  // public async addResumes(token: string): Promise<void> {
  //   const resumes = await this.apiRepository.getResumes();
  // }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}

// https://gabrieltanner.org/blog/nestjs-file-uploading-using-multer/
// https://docs.nestjs.com/techniques/file-upload
// https://dev.to/carlomigueldy/building-a-restful-api-with-nestjs-and-mongodb-mongoose-2165
