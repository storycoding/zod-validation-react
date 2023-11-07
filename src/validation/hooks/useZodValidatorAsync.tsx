import { useEffect, useRef, useState } from "react";
import {
  type SubscriberFormData,
  subscriberFormSchema,
} from "../schemas/subscriberForm.client";

import { type z } from "zod";

type ServerFieldErrors = z.inferFlattenedErrors<
  typeof subscriberFormSchema
>["fieldErrors"];

const useZodValidatorAsync = <InputSchema extends z.ZodType>(
  input: SubscriberFormData,
  inputSchema: InputSchema,
  interval: number,
) => {
  const [fieldErrors, setFieldErrors] = useState<ServerFieldErrors>();

  const timeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(async () => {
      const validation = await inputSchema.safeParseAsync(input);
      if (validation.success) {
        setFieldErrors({});
      } else {
        const fieldErrors = validation.error.flatten().fieldErrors;
        setFieldErrors(fieldErrors);
      }
    }, interval);

    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [input, inputSchema, interval]);

  return { fieldErrors, setFieldErrors };
};

export default useZodValidatorAsync;
