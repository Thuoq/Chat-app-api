import {
   registerDecorator,
   ValidationArguments,
   ValidationOptions,
   ValidatorConstraint,
   ValidatorConstraintInterface,
} from 'class-validator';

export function Match(property: string, validationOptions?: ValidationOptions) {
   return function (object: any, propertyName: string) {
      registerDecorator({
         target: object.constructor,
         propertyName,
         options: validationOptions,
         constraints: [property],
         validator: MatchConstraint,
      });
   };
}
@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
   validate(
      value: string,
      args?: ValidationArguments,
   ): Promise<boolean> | boolean {
      const [relatedPropertyName] = args.constraints;
      const relatedValue = args.object[relatedPropertyName];
      return relatedValue === value;
   }
   defaultMessage(args?: ValidationArguments): string {
      return args.property + ' must match ' + args.constraints[0];
   }
}
