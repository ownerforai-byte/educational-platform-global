import { createClient } from "@/lib/db/server";

export type StorageUploadOptions = {
  bucket: string;
  path: string;
  file: Buffer | Uint8Array;
  contentType: string;
  upsert?: boolean;
};

export type StorageSignedUrlOptions = {
  bucket: string;
  path: string;
  expiresIn?: number;
};

export interface StorageService {
  upload(options: StorageUploadOptions): Promise<{ path: string; publicUrl?: string }>;
  getSignedUrl(options: StorageSignedUrlOptions): Promise<string>;
  delete(bucket: string, path: string): Promise<void>;
}

export class SupabaseStorageService implements StorageService {
  async upload({ bucket, path, file, contentType, upsert = false }: StorageUploadOptions) {
    const supabase = await createClient();
    const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
      contentType,
      upsert,
    });

    if (error) {
      throw new Error(`Storage upload failed: ${error.message}`);
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
    return {
      path: data.path,
      publicUrl: urlData.publicUrl,
    };
  }

  async getSignedUrl({ bucket, path, expiresIn = 3600 }: StorageSignedUrlOptions): Promise<string> {
    const supabase = await createClient();
    const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, expiresIn);

    if (error || !data) {
      throw new Error(`Failed to create signed URL: ${error?.message ?? "Unknown error"}`);
    }

    return data.signedUrl;
  }

  async delete(bucket: string, path: string) {
    const supabase = await createClient();
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      throw new Error(`Storage delete failed: ${error.message}`);
    }
  }
}

let storageService: StorageService | null = null;

export function getStorageService(): StorageService {
  if (!storageService) {
    storageService = new SupabaseStorageService();
  }
  return storageService;
}

export function setStorageService(service: StorageService) {
  storageService = service;
}
