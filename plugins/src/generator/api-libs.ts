import { Tree, formatFiles, joinPathFragments, names, installPackagesTask } from '@nx/devkit';
import { libraryGenerator } from '@nx/nest';
import { ApiLibsGeneratorSchema } from './schema';

export default async function (tree: Tree, options: ApiLibsGeneratorSchema) {
  const libName = options.name + '-api';
  // 1. Crear la lib NestJS
  await libraryGenerator(tree, {
    name: libName,
    directory: `libs/${libName}`,
    importPath: `@cinema/${libName}`,
    buildable: false,
    publishable: false,
    strict: true,
    unitTestRunner: 'jest' 
  });

  const libPath = `libs/${libName}/src`;
  const folders = [
    'controllers/v1',
    'dtos',
    'mappers',
    'application/use-cases',
    'domain/entities',
    'domain/ports',
    'domain/services',
    'infrastructure/repositories',
    'infrastructure/gateway',
    'infrastructure/guards',
    'infrastructure/strategies',
  ];

  folders.forEach(folder => {
    const fullPath = joinPathFragments(libPath, folder);
    if (!tree.exists(fullPath)) {
      tree.write(joinPathFragments(fullPath, '.gitkeep'), '');
    }
  });

  // 3. Escribir módulo y controlador básicos
  const moduleFile = `${libPath}/${libName}.module.ts`;
  const controllerFile = `${libPath}/controllers/v1/hello.controller.ts`;

  tree.write(moduleFile, `
import { Module } from '@nestjs/common';
import { HelloController } from './controllers/v1/hello.controller';

@Module({
  controllers: [HelloController],
})
export class ${names(libName).className}Module {}
  `);

  tree.write(controllerFile, `
import { Controller, Get } from '@nestjs/common';

@Controller('v1/hello')
export class HelloController {
  @Get()
  sayHello() {
    return { message: 'Hola desde ${libName}!' };
  }
}
  `);

  // 5. Crear ejemplo de prueba
  const testFile = `${libPath}/controllers/v1/hello.controller.spec.ts`;
  tree.write(testFile, `
import { HelloController } from './hello.controller';

describe('HelloController', () => {
  it('should return a greeting', () => {
    const ctrl = new HelloController();
    expect(ctrl.sayHello()).toEqual({ message: 'Hola desde ${libName}!' });
  });
});
  `);

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}