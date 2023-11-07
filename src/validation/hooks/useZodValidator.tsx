import { useEffect, useState } from "react";
import { type z } from "zod";

const useZodValidator = <InputSchema extends z.ZodType>(
  input: z.infer<InputSchema>,
  inputSchema: InputSchema,
) => {
  type FieldErrors = z.inferFlattenedErrors<InputSchema>["fieldErrors"];

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  useEffect(() => {
    const result = inputSchema.safeParse(input);
    if (result.success) {
      setFieldErrors({});
    } else {
      const fieldErrors = result.error.flatten().fieldErrors;
      setFieldErrors(fieldErrors);
    }
  }, [input, inputSchema]);

  return { fieldErrors, setFieldErrors };
};

export default useZodValidator;
