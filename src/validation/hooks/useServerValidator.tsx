import { useEffect, useRef, useState } from "react";
import type {
  SubscriberFormSchema,
  SubscriberFormData,
} from "../schemas/subscriberForm.client";
import { type z } from "zod";
import { validateSubscriberForm } from "../../apiCalls";

type ServerFieldErrors =
  z.inferFlattenedErrors<SubscriberFormSchema>["fieldErrors"];

const useServerValidator = (input: SubscriberFormData, interval: number) => {
  const [fieldErrors, setFieldErrors] = useState<ServerFieldErrors>({});

  const timeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(async () => {
      const validation = await validateSubscriberForm(input);
      const newFieldErrors =
        validation && "fieldErrors" in validation ? validation.fieldErrors : {};
      setFieldErrors(newFieldErrors);
    }, interval);

    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [input, interval]);

  return { fieldErrors, setFieldErrors };
};

export default useServerValidator;
