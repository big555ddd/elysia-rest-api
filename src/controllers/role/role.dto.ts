export interface CreateRoleDTO {
  name : string;
}

export interface UpdateRoleDTO {
  name?: string;
}

export interface Params {
  form?: number;
  size?: number;
  search?: string;
}

// type GetGroupTempTextListRequest struct {
//   form     int    `form:"form"`
//   Size     int    `form:"size"`
//   SortBy   string `form:"sort_by"`
//   OrderBy  string `form:"order_by"`
//   Search   string `form:"search"`
//   SearchBy string `form:"search_by"`
// }