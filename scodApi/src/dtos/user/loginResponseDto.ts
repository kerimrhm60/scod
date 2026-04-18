export interface LoginResponseDto {
  token: string;
  user: {
    UserID: number;
    Name: string;
    Surname: string;
    Email: string;
    Phone: string;
    RoleID: number;
  };
}