import { useState } from "react";
import { useZodValidator, useServerValidator } from "../validation/hooks";
import {
  defaultSubscriberFormData,
  subscriberFormSchema,
} from "../validation/schemas/subscriberForm.client";

import { postSubscriber } from "../apiCalls";
import deepMergeFieldErrors from "../helpers/deepMergeFieldErrors";

const SubscriberForm = () => {
  const [subscriberFormData, setSubscriberFormData] = useState(
    defaultSubscriberFormData,
  );
  const [isSubscribedSuccessfuly, setSubscribedSuccessfuly] = useState(false);

  const {
    fieldErrors: clientFieldErrors,
    setFieldErrors: setClientFieldErrors,
  } = useZodValidator(subscriberFormData, subscriberFormSchema);
  const {
    fieldErrors: serverFieldErrors,
    setFieldErrors: setServerFieldErrors,
  } = useServerValidator(subscriberFormData, 300);

  const fieldErrors = deepMergeFieldErrors(
    clientFieldErrors,
    serverFieldErrors,
  );

  const hasFieldErrors = Object.values(fieldErrors).length > 0;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubscribedSuccessfuly(false);
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.type === "number"
        ? parseInt(event.target.value)
        : event.target.value;

    setSubscriberFormData({
      ...subscriberFormData,
      [event.target.name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await postSubscriber(subscriberFormData);
    if ("fieldErrors" in res && res.fieldErrors) {
      setServerFieldErrors(res.fieldErrors);
    } else {
      setSubscribedSuccessfuly(true);
      setClientFieldErrors({});
      setServerFieldErrors({});
    }
  };

  const handleReset = () => {
    setSubscribedSuccessfuly(false);
    setSubscriberFormData(defaultSubscriberFormData);
    setServerFieldErrors({});
    setClientFieldErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Follow us ✨</h3>
      <div>
        <label htmlFor="email">email:</label>
        <input
          name="email"
          type="text"
          value={subscriberFormData.email}
          onChange={handleChange}
        />
        <p className="error">{fieldErrors.email?.[0] || " "}</p>
      </div>
      <div>
        <label htmlFor="emailVerification">verify email:</label>
        <input
          name="emailVerification"
          type="text"
          value={subscriberFormData.emailVerification}
          onChange={handleChange}
        />
        <p className="error">{fieldErrors.emailVerification?.[0] || " "}</p>
      </div>
      <div>
        <label htmlFor="name">name:</label>
        <input
          name="name"
          type="text"
          value={subscriberFormData.name}
          onChange={handleChange}
        />
        <p className="error">{fieldErrors.name?.[0] || " "}</p>
      </div>
      <div>
        <label htmlFor="age">age:</label>
        <input
          name="age"
          type="number"
          value={subscriberFormData.age}
          onChange={handleChange}
        />
        <p className="error">{fieldErrors.age?.[0] || " "}</p>
      </div>
      <div>
        <label htmlFor="acceptsTerms">I accept the terms</label>
        <input
          type="checkbox"
          name="acceptsTerms"
          checked={subscriberFormData.acceptsTerms}
          onChange={handleChange}
        />
        <p className="error">{fieldErrors.acceptsTerms?.[0] || " "}</p>
      </div>
      {isSubscribedSuccessfuly ? (
        <>
          <button type="reset" onClick={handleReset}>
            Clear
          </button>
          <p className="success">Subscribed successfully!</p>
        </>
      ) : (
        <button type="submit" disabled={hasFieldErrors}>
          Subscribe
        </button>
      )}
    </form>
  );
};

export default SubscriberForm;
