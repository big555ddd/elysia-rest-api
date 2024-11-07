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

// type GetGroupTempTextListRequest struct {
//   form     int    `form:"form"`
//   Size     int    `form:"size"`
//   SortBy   string `form:"sort_by"`
//   OrderBy  string `form:"order_by"`
//   Search   string `form:"search"`
//   SearchBy string `form:"search_by"`
// }