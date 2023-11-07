import { type ZodFieldErrors } from "../types";

const deepMergeFieldErrors = (...fieldErrors: ZodFieldErrors[]) => {
  const mergedFieldErrors: ZodFieldErrors = {};

  for (const errorMessages of fieldErrors) {
    if (errorMessages === null) continue;

    for (const key in errorMessages) {
      if (errorMessages.hasOwnProperty(key)) {
        if (key in mergedFieldErrors) {
          mergedFieldErrors[key] =
            mergedFieldErrors[key]?.concat(errorMessages[key] || []) ||
            errorMessages[key];
        } else {
          mergedFieldErrors[key] = errorMessages[key];
        }
      }
    }
  }

  return mergedFieldErrors;
};

export default deepMergeFieldErrors;
