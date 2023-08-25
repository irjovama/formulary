import { useEffect, useState } from 'react';

export default function Formulary({ context }) {
  const [ready, setReady] = [context.ready, context.setReady];
  const [result, setResult] = [context.result, context.setResult];
  const [updates, setUpdates] = useState(0);
  function getUnsavedResults() {
    return result.length > 0 && result.filter((r) => !r?.saved);
  }

  useEffect(() => {
    context.setLoading(true);
    context.asyncOnLoad(result).then((data) => {
      if (data.length > 0 && data != false) {
        for (let datum of data) {
          context.fields.map((f) => {
            if (f.name == datum.name) {
              f.defaultValue = datum.value;
            }
            return f;
          });
        }
        setReady(true);
      } else if (data == false) {
        context.setMessage('Error loading');
      }
      context.setLoading(false);
    });
  }, []);

  function setSavedResults() {
    if (getUnsavedResults()) {
      setResult(
        result.map((r) => {
          r.saved = true;
          return r;
        })
      );
    }
  }

  useEffect(() => {
    if (ready) {
      let timerId;
      const handleInputChange = async () => {
        context.setMessage('Auto save in progress');
        context.setLoading(true);
        const unSavedResults = getUnsavedResults();
        if (unSavedResults) {
          const saved = await context.asyncOnAutoSave(unSavedResults);
          if (saved) {
            setSavedResults();
          }
        }
        context.setMessage('');
        context.setLoading(false);
      };

      clearTimeout(timerId);
      timerId = setTimeout(handleInputChange, 5000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [updates]);

  function handleChange(event) {
    const element = event.target;
    const index = result.findIndex((i) => i.name == element.name);

    if (index >= 0) {
      result[index].saved = false;
      result[index].value = element.value;
    } else {
      result.push({ name: element.name, value: element.value, saved: false });
    }

    setResult(result);
    setUpdates(updates + 1);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    context.setLoading(true);
    const saved = await context.asyncOnSubmit(getUnsavedResults(), e.target);
    if (saved) {
      setSavedResults();
    }
    context.setLoading(false);
  }

  return (
    <>
      <form autoComplete="off" onChange={handleChange} onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
          }}
        >
          {context.title}
          {context &&
            context.fields.length > 0 &&
            context.fields.map((field) => {
              const [optVisible, setOptVisible] = useState('none');
              const [filterOptions, setFilterOptions] = useState(field.options);
              const [value, setValue] = useState(field.defaultValue || '');
              if (!field?.id) field.id = field.name;
              if (!field?.label) field.label = field.name;

              return (
                <div key={field.id}>
                  {field.type == 'text' && (
                    <div style={{}}>
                      <label htmlFor={field.name}>{field.label}</label>
                      <div>
                        {
                          <input
                            {...field}
                            disabled={
                              !ready || context.loading
                                ? true
                                : context.disabled
                            }
                            value={value}
                            onChange={(e) => {
                              setValue(e.target.value);
                            }}
                            onBlur={(e) => {
                              setTimeout(
                                (e) => {
                                  setOptVisible('none');
                                  if (field?.onBlur) field.onBlur(e);
                                },
                                100,
                                e
                              );
                            }}
                            onClick={(e) => {
                              setOptVisible(
                                optVisible == 'none' ? 'block' : 'none'
                              );
                              if (field?.onClick) field.onClick(e);
                            }}
                          />
                        }
                        <div
                          style={{
                            overflow: 'auto',
                            width: '50%',
                            maxHeight: '100px',
                            border: '1px solid',
                            position: 'absolute',
                            background: 'white',
                            display: optVisible,
                          }}
                        >
                          {field.options &&
                            field.options.length > 0 &&
                            field.options
                              .filter((o) =>
                                String(o)
                                  .toUpperCase()
                                  .includes(String(value).toUpperCase())
                              )
                              .map((o, index) => {
                                return (
                                  <div
                                    key={o}
                                    style={{
                                      background:
                                        index % 2 == 0 ? 'white' : 'lightgray',
                                    }}
                                    onClick={() => {
                                      setValue(o)
                                    }}
                                  >
                                    {o}
                                  </div>
                                );
                              })}
                        </div>
                      </div>
                    </div>
                  )}
                  {field.type == 'component' && field.component}
                </div>
              );
            })}
        </div>
        {context.message != '' && context.message}

        {!ready || context.loading
          ? context.loadingComponent
          : context.submitButton}
      </form>
    </>
  );
}
