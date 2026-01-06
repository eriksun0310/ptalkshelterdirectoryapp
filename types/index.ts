// ===== Shelter Types =====

/** 標籤類型 */
export type ShelterTag = 'remote' | 'appointment' | 'small' | 'private';

/** 標籤顯示對照 */
export const SHELTER_TAG_LABELS: Record<ShelterTag, string> = {
  remote: '偏遠',
  appointment: '需預約',
  small: '小型園',
  private: '私人狗園',
};

/** 聯絡方式 */
export interface ContactInfo {
  line?: string;
  phone?: string;
  facebook?: string;
  instagram?: string;
}

/** 注意事項 */
export interface ShelterNotices {
  requiresAppointment: boolean;
  allowsDropIn: boolean;
  acceptsVolunteers: boolean;
  acceptsDonations: boolean;
  specialNotes?: string;
}

/** 流浪動物之家 - 列表項目 */
export interface ShelterListItem {
  id: string;
  name: string;
  city: string;
  district: string;
  shortDescription: string;
  tags: ShelterTag[];
}

/** 流浪動物之家 - 詳細資訊 */
export interface ShelterDetail extends ShelterListItem {
  description: string;
  notices: ShelterNotices;
  contact: ContactInfo;
  /** 詳細規定 (志工/參訪規則) */
  rules?: string[];
}

/** 篩選條件 */
export interface ShelterFilters {
  city?: string;
  district?: string;
  tags?: ShelterTag[];
}

// ===== Auth Types =====

/** 使用者 */
export interface User {
  id: string;
  email: string;
}

/** 登入請求 */
export interface LoginRequest {
  email: string;
  password: string;
}

/** 註冊請求 */
export interface RegisterRequest {
  email: string;
  password: string;
}

/** 認證回應 */
export interface AuthResponse {
  user: User;
  token: string;
}

// ===== API Types =====

/** API 通用回應 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/** 分頁回應 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
