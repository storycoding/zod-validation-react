import { useEffect, useState } from 'react';
import { type z } from 'zod';

const useValidator = <InputSchema extends z.ZodType>(
  input: z.infer<InputSchema>,
  inputSchema: InputSchema
) => {
  // the type of error.flatten().fieldErrors
  type FieldErrors = z.inferFlattenedErrors<InputSchema>['fieldErrors'];

  const [fieldErrors, setFieldErrors] = useState<FieldErrors | null>();

  useEffect(() => {
    const result = inputSchema.safeParse(input);
    if (result.success) {
      setFieldErrors(null);
    } else {
      const fieldErrors = result.error.flatten().fieldErrors;
      setFieldErrors(fieldErrors);
    }
  }, [input, inputSchema]);

  return { fieldErrors, setFieldErrors };
};


export default useValidator;
