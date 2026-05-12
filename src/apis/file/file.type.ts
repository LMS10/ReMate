export type FileUploadType = 'PROFILE' | 'RECEIPT';

export interface UploadFileRequest {
  file: File;
  type: FileUploadType;
  workspaceId?: number;
}

export interface UploadFileResponse {
  fileId: number;
}
