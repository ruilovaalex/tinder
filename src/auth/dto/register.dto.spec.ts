import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RegisterDto } from './register.dto';

describe('RegisterDto', () => {
  it('acepta un registro valido', async () => {
    const dto = plainToInstance(RegisterDto, {
      name: 'Usuario',
      email: 'user@example.com',
      age: 21,
      password: 'Password2026!',
    });

    expect(await validate(dto)).toHaveLength(0);
  });

  it('rechaza menores, emails invalidos y passwords cortos', async () => {
    const dto = plainToInstance(RegisterDto, {
      name: '',
      email: 'correo-invalido',
      age: 17,
      password: '123',
    });

    expect((await validate(dto)).length).toBeGreaterThanOrEqual(4);
  });
});
