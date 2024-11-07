export interface CreatePermissionDTO {
  id: number;
  name: string;
  description: string;
  is_actived: boolean;
}

export interface PermissionDTO {
  id: number;
  name: string;
  description: string;
  is_actived: boolean;
}

export interface SetPermissionDTO {
  role_id?: number;
  permission_id?: Array<number>;
}
