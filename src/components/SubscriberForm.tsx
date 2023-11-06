import { useState } from 'react';
import { useValidator } from '../hooks';
import {
  defaultSubscriberFormData,
  subscriberFormSchema,
  validateSubscriberFormData,
} from '../validation/schemas/subscriberForm';

const SubscriberForm = () => {
  const [subscriberFormData, setSubscriberFormData] = useState(defaultSubscriberFormData);
  const { fieldErrors } = useValidator(subscriberFormData, subscriberFormSchema);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(JSON.stringify(subscriberFormData, null, 2));
  };

  const isFormValid = validateSubscriberFormData(subscriberFormData);

  return (
    <form onSubmit={handleSubmit}>
      <h3>Follow us ✨</h3>
      <div>
        <label htmlFor="email">email:</label>
        <input
          name="email"
          type="text"
          value={subscriberFormData.email}
          onChange={(e) => {
            setSubscriberFormData({ ...subscriberFormData, email: e.target.value });
          }}
        />
        <p className="error">{fieldErrors?.email?.[0] || ' '}</p>
      </div>
      <div>
        <label htmlFor="name">name:</label>
        <input
          name="name"
          type="text"
          value={subscriberFormData.name}
          onChange={(e) => {
            setSubscriberFormData({ ...subscriberFormData, name: e.target.value });
          }}
        />
        <p className="error">{fieldErrors?.name?.[0] || ' '}</p>
      </div>
      <div>
        <label htmlFor="age">age:</label>
        <input
          name="age"
          type="number"
          value={subscriberFormData.age}
          onChange={(e) => {
            setSubscriberFormData({ ...subscriberFormData, age: parseInt(e.target.value) });
          }}
        />
        <p className="error">{fieldErrors?.age?.[0] || ' '}</p>
      </div>
      <div>
        <label htmlFor="acceptsTerms">I accept the terms</label>
        <input
          type="checkbox"
          name="acceptsTerms"
          checked={subscriberFormData.acceptsTerms}
          onChange={(e) => {
            setSubscriberFormData({ ...subscriberFormData, acceptsTerms: e.target.checked });
          }}
        />
        <p className="error">{fieldErrors?.acceptsTerms?.[0] || ' '}</p>
      </div>
      <button type="submit" disabled={!isFormValid}>Subscribe</button>
    </form>
  );
};

export default SubscriberForm;
