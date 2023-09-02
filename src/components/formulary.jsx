import { useEffect } from 'react';
import { setSavedResults, getUnsavedResults } from './saved-results';
import {
  handleSubmit,
  handleChange,
  handleOnLoad,
  handleAutoSave,
} from './handles';
import { principalTypes } from '../utils/principal-types';
import { FieldConstructor } from './constructor';

export default function Formulary({ context }) {
  useEffect(() => {
    handleOnLoad(context);
  }, []);

  useEffect(() => {
    let timerId;
    const handleInputChange = async () => {
      handleAutoSave(context);
    };
    if (
      context.updates > 0 &&
      context.result.length > 0 &&
      context.errors.length == 0
    ) {
      clearTimeout(timerId);
      timerId = setTimeout(handleInputChange, 5 * 1000);
    } else {
      console.log('no entro');
      timerId = null;
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [context.updates]);

  return (
    <>
      {
        <>
          <div>{context.title}</div>
          <form
            autoComplete="off"
            onSubmit={(e) => handleSubmit(e, context)}
            onChange={(e) => {
              handleChange(e, context);
              context.asyncOnChange(e)
            }}
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
            {!context.loading && context.submitButton}
          </form>
        </>
      }
    </>
  );
}
