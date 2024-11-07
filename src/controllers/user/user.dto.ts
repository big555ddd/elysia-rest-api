export interface CreateUserDTO {
  username: string;
  password: string;
  role_id : number;
  first_name: string;
  last_name: string;
}

export interface UpdateUserDTO {
  username?: string;
  password?: string;
  role_id?: number;
  first_name?: string;
  last_name?: string;
}

export interface Params {
  form?: number;
  size?: number;
  search?: string;
  searchby?: string;
  role_id?: number;
}
