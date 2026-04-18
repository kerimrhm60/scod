import { IUserService } from "../interface/ıuserService"; // doğru path olduğundan emin ol
import { HttpStatus, Response } from "../../response/response";
import { RegisterUserDto } from "../../dtos/user/registerResponseDto";
import { UserRepository } from "../../repository/prisma/userrepository";
import { LoginDto } from "../../dtos/user/loginDto";
import { LoginResponseDto } from "../../dtos/user/loginResponseDto";
import { generateToken } from "../../helpers/jwt";
import { UserListDto } from "../../dtos/user/userListDto";

export class UserManager implements IUserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async login(model: LoginDto): Promise<Response<LoginResponseDto>> {
    const user = await this.userRepository.getQueryablee((q: any) => ({
      AND: [{ Phone: model.Phone }, { Password: model.Password }],
    }));
    if (!user) {
      return Response.failure<LoginResponseDto>(
        "Kullanıcı bulunamadı",
        undefined,
        HttpStatus.NOT_FOUND
      );
    }
    const token = generateToken({
      UserID: user.UserID,
      Name: user.Name,
      Surname: user.Surname,
      Email: user.Email,
      Phone: user.Phone,
      RoleID:user.RoleID,
    });
    const response: LoginResponseDto = {
      token,
      user: {
        UserID: user.UserID,
        Name: user.Name,
        Surname: user.Surname,
        Email: user.Email,
        Phone: user.Phone,
        RoleID:user.RoleID,
      },
    };
    return Response.success<LoginResponseDto>(
      response,
      "Giriş başarılı",
      HttpStatus.OK
    );
  }

  public async register(fields: RegisterUserDto): Promise<Response<boolean>> {
    const existingUser = await this.userRepository.getQueryablee((q: any) => ({
      OR: [{ Email: fields.Email }, { Phone: fields.Phone ?? undefined }],
    }));
    if (existingUser) {
      return Response.failure<boolean>(
        "Bu e-posta veya telefon numarası zaten kullanılıyor",
        false,
        HttpStatus.BAD_REQUEST
      );
    }
    try {
      await this.userRepository.create({
        Name: fields.Name,
        Surname: fields.Surname,
        Username: fields.Username,
        Email: fields.Email,
        Password: fields.Password,
        Phone: fields.Phone ?? null,
        RoleID:2,
      });

      return Response.success<boolean>(
        true,
        "Kullanıcı başarıyla oluşturuldu",
        HttpStatus.CREATED
      );
    } catch (error) {
      return Response.failure<boolean>(
        "Kullanıcı oluşturulamadı",
        false,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async userList(request: number): Promise<Response<UserListDto[]>> {
    try {
      const users = await this.userRepository.getManyQueryable();

      return Response.success<UserListDto[]>(
        users,
        "İşlem başarıyla gerçekleştirildi",
        HttpStatus.OK
      );
    } catch (error) {
      return Response.failure<UserListDto[]>(
        "Alışlar getirilirken hata oluştu",
        [],
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
