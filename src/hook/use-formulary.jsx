import { useEffect, useState } from 'react';

export default function useFormulary({
  formTitle,
  loadingComponent,
  submitComponent,
  fieldsArray,
  asyncOnLoad,
  asyncOnSubmit,
  asyncOnChange,
  asyncOnAutoSave,
}) {
  validateFields({
    formTitle,
    fieldsArray,
    asyncOnLoad,
    asyncOnSubmit,
    asyncOnChange,
    asyncOnAutoSave,
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(fieldsArray);
  const [title, setTitle] = useState(formTitle);
  const [result, setResult] = useState([]);
  const [ready, setReady] = useState([]);
  const [submitButton, setSubmitButton] = useState(submitComponent);
  const sleep = async (ms) => {
    await new Promise((resolve) => {
      setInterval(() => {
        resolve(true);
      }, ms);
    });
  };
  useEffect(() => {
    if (asyncOnLoad) {
      asyncOnLoad();
    }
  }, []);
  function setValue(fieldName, value) {
    setLoading(true);
    const index = fields.findIndex((f) => f.name === fieldName);
    fields[index].defaultValue = value;
    setFields(fields);
    new Promise((resolve) => {
      setInterval(() => {
        setLoading(false);
      }, 1);
    })
  }
  function setOptions(fieldName, options) {
    setLoading(true);
    const index = fields.findIndex((f) => f.name === fieldName);
    fields[index].options = options;
    setFields(fields);
    new Promise((resolve) => {
      setInterval(() => {
        resolve()
      }, 100);
    }).then(()=>setLoading(false))
  }
  return {
    loading,
    setLoading,
    fields,
    setFields,
    title,
    setTitle,
    result,
    setResult,
    submitButton,
    setSubmitButton,
    asyncOnLoad,
    asyncOnSubmit,
    asyncOnChange,
    asyncOnAutoSave,
    loadingComponent,
    message,
    setMessage,
    setOptions,
    ready,
    setReady,
    setValue,
  };
}

function validateFields({
  formTitle,
  fieldsArray,
  asyncOnLoad,
  asyncOnSubmit,
  asyncOnChange,
  asyncOnAutoSave,
}) {
  isNotNull(formTitle);
  isArray(fieldsArray);
  isAsyncFunction(asyncOnLoad);
  isAsyncFunction(asyncOnSubmit);
  isAsyncFunction(asyncOnChange);
  isAsyncFunction(asyncOnAutoSave);
}

function isNotNull(element) {
  if (element == undefined || element == null)
    throw new Error('formTitle cannot be null');
}

function isString(text) {
  if (text != undefined)
    if (typeof text !== 'string') throw new Error('formTitle must be a string');
}

function isArray(arr) {
  if (arr != undefined)
    if (typeof arr !== 'object')
      throw new Error('fields array must be an array');
}

function isAsyncFunction(fn) {
  if (fn != undefined) {
    if (
      typeof fn !== 'function' ||
      (fn instanceof Function && fn.constructor.name !== 'AsyncFunction')
    )
      throw new Error(
        'asyncOnLoad, asyncOnSubmit, asyncOnChange, asyncOnAutoSave must be async functions'
      );
  }
}
