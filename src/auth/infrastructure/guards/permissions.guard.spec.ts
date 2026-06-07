import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsGuard } from './permissions.guard';

describe('PermissionsGuard', () => {
  const reflector = {
    getAllAndOverride: jest.fn(),
  } as unknown as Reflector;
  const guard = new PermissionsGuard(reflector);

  function contextWithPermissions(permissions: string[]): ExecutionContext {
    return {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({ user: { permissions } }),
      }),
    } as unknown as ExecutionContext;
  }

  beforeEach(() => jest.clearAllMocks());

  it('permite acceso cuando no se requieren permisos', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);
    expect(guard.canActivate(contextWithPermissions([]))).toBe(true);
  });

  it('exige todos los permisos declarados', () => {
    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue(['read_role', 'update_role']);

    expect(
      guard.canActivate(
        contextWithPermissions(['read_role', 'update_role', 'delete_role']),
      ),
    ).toBe(true);
    expect(guard.canActivate(contextWithPermissions(['read_role']))).toBe(
      false,
    );
  });
});
