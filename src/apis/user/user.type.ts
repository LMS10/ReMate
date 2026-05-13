export interface UserProfile {
  email: string;
  name: string;
  picture: string | null;
}

export interface UpdateNameRequest {
  name: string;
}

export interface UpdateProfileImageRequest {
  fileId: number;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
