import { z } from 'zod';

export const subscriberFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Please enter a valid name')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email'),
  age: z.number().min(18, 'You have to be at least 18 years old'),
  acceptsTerms: z.boolean({ required_error: 'You must accept the terms' }), // todo: enforce true
});

export type SubscriberFormData = z.infer<typeof subscriberFormSchema>;

// the id of 0 is a hack to get around the fact that the assigneeId is required
export const defaultSubscriberFormData: SubscriberFormData = {
  name: '',
  email: '',
  age: 0, // todo: how do I make these optional and keep the required error?
  acceptsTerms: false, // todo: how do I make these optional and keep the required error?
};

// todo: return specific errors
export const validateSubscriberFormData = (formData: SubscriberFormData) => {
  return subscriberFormSchema.safeParse(formData).success;
};
