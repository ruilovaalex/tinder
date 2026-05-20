export interface RoleEntity {
  id: number;
  name: string;
  description: string | null;
}

export interface RoleWithPermissionsEntity extends RoleEntity {
  permissions: {
    id: number;
    name: string;
    description: string | null;
  }[];
}
