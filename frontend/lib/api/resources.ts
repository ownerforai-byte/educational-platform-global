import { apiFetch } from "../api-client";
import type {
  Resource,
  ResourceCreateRequest,
  ResourceLinkRequest,
  ResourceReference,
  ResourceUpdateRequest,
} from "../../types/api";

/**
 * List published resources.
 */
export async function listResources(): Promise<Resource[]> {
  return apiFetch<Resource[]>("/api/resources");
}

/**
 * Get a single resource by ID.
 */
export async function getResource(id: string): Promise<Resource> {
  return apiFetch<Resource>(`/api/resources/${encodeURIComponent(id)}`);
}

/**
 * Create a new resource (teacher/admin only).
 */
export async function createResource(
  data: ResourceCreateRequest
): Promise<Resource> {
  return apiFetch<Resource>("/api/resources", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Update an existing resource (teacher/admin only).
 */
export async function updateResource(
  id: string,
  data: ResourceUpdateRequest
): Promise<Resource> {
  return apiFetch<Resource>(`/api/resources/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

/**
 * Delete a resource (teacher/admin only).
 */
export async function deleteResource(id: string): Promise<{ success: true }> {
  return apiFetch<{ success: true }>(
    `/api/resources/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
    }
  );
}

/**
 * Link a resource to another resource (teacher/admin only).
 */
export async function linkResource(
  data: ResourceLinkRequest
): Promise<ResourceReference> {
  return apiFetch<ResourceReference>(
    `/api/resources/${encodeURIComponent(data.resource_id)}/link`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}
