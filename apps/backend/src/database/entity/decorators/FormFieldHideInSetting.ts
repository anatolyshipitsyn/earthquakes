export const FormFieldHideInSetting = () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function (target: any, propertyKey: string) {
    Reflect.defineMetadata('FormFieldHideInSetting', true, target, propertyKey);
  };
