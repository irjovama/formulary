import { useEffect } from 'react';
import { setSavedResults, getUnsavedResults } from './saved-results';
import { handleSubmit, handleChange, handleOnLoad } from './handles';
import { principalTypes } from '../utils/principal-types';
import { FieldConstructor } from './constructor';

export default function Formulary({ context }) {
  useEffect(() => {
    handleOnLoad(context);
  }, []);

  useEffect(() => {
    // handleAutoSave(context);
  }, [context.updates]);

  return (
    <>
      {
        <>
          <div>{context.title}</div>
          <form
            autoComplete="off"
            onSubmit={(e) => handleSubmit(e, context)}
            onChange={(e) => handleChange(e, context)}
          >
            {context.fields &&
              context.fields.map((field) => {
                return (
                  <FieldConstructor
                    key={field.name}
                    context={context}
                    field={field}
                  />
                );
              })}
            {context.submitButton}
          </form>
        </>
      }
    </>
  );
}
