import { HttpStatus, Response } from "../../response/response";
import { ICustomerService } from "../interface/ıcustomerService";
import { CustomerRepository } from "../../repository/prisma/customerrepository";
import { CreateCustomerDto } from "../../dtos/customer/customerDto";
import { CustomerResponseDto } from "../../dtos/customer/customerResponseDto";

export class CustomerManager implements ICustomerService {
  private customerRepository: CustomerRepository;
  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  public async createCustomer(
    fields: CreateCustomerDto
  ): Promise<Response<boolean>> {
    const existingUser = await this.customerRepository.getQueryablee(
      (q: any) => ({
        OR: [{ Phone: fields.Phone ?? undefined }],
      })
    );
    console.log("gelen veri manager sınıfında konsole yazdırılıyor : ", fields)
    if (existingUser) {
      return Response.failure<boolean>(
        "Bu e-posta veya telefon numarası zaten kullanılıyor",
        false,
        HttpStatus.BAD_REQUEST
      );
    }
    try {
      await this.customerRepository.create({
        ClientName: fields.ClientName,
        ClientSurname: fields.ClientSurname,
        Phone: fields.Phone,
        Address: fields.Address,
        Update_At:new Date(),
        Created_At:new Date(),
        UserID: fields.UserID,
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

    public async customerList(
      userId: number
    ): Promise<Response<CustomerResponseDto[]>> {
      try {
        const customers = await this.customerRepository.getManyQueryable(
          (q: any) => ({
            UserID: userId,
          })
        );
  
        if (!customers || customers.length === 0) {
          return Response.success<CustomerResponseDto[]>(
            [],
            "Kullanıcıya ait müşteri bulunamadı",
            HttpStatus.NOT_FOUND
          );
        }
  
        const customerDtos: CustomerResponseDto[] = customers.map((customer) => ({
          ClientID:customer.ClientID,
          ClientName:customer.ClientName,
          ClientSurname:customer.ClientSurname
        }));
  
        return Response.success<CustomerResponseDto[]>(
          customerDtos,
          "Müşteriler başarıylagetirildi",
          HttpStatus.OK
        );
      } catch (error) {
        console.error("Müşteriler getirilirken hata:", error);
        return Response.failure<CustomerResponseDto[]>(
          "Müşteriler getirilirken hata oluştu",
          [],
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
}
