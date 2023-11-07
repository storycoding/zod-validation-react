# About this repo
This repo features a simple and efficient setup for validation in client and server using zod and react-hooks

## The use case
Forms often require to be validated both in client and server side

## The challenge
- having a clear declaration of schema + specific errors
- aligning validation between client and server
- not polluting the front-end with validation logic
- standardising error message loading from client and server side
- fully supporting types 💪

## The ideal scenario
```
const { fieldErrors } = useValidatior(formData, formSchema);

<input id='name'/>
<label for='name'>{fieldErrors.name}</label>
```

and so on.

## How we achieve that in this example
- Using [zod](www.zod.dev) as our schema validation provider
- Using custom react hooks to separate the validation logic from the front-end components
- Using the same schema from the client side in the server side, with extended checks ( such as a db query )
- Using the same format in the fieldError payload from the server as we use in the client

## Credits
author: [storyding](https://github.com/storycoding)

oracle: [candu](https://github.com/candu)


## Related
[Medium Post](https://medium.com/@storycoding/uniting-be-and-fe-validation-with-zod-typescript-and-react-hooks-973f7f8b7467).