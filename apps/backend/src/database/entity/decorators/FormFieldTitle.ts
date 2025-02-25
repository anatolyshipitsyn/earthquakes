export const FormFieldTitle = (title: string) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function (target: any, propertyKey: string) {
    Reflect.defineMetadata('FormFieldTitle', title, target, propertyKey);
  };
