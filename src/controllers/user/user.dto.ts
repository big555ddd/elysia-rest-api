export interface CreateUserDTO {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
  }
  
  export interface UpdateUserDTO {
    username?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
  }
  