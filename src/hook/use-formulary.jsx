import { useState } from 'react';
import validateFields from './validations';

export default function useFormulary({
  formTitleComponent,
  loadingComponent,
  submitComponent,
  fieldsArray,
  asyncOnLoad,
  asyncOnSubmit,
  asyncOnChange,
  asyncOnAutoSave,
}) {
  validateFields({
    formTitleComponent,
    loadingComponent,
    submitComponent,
    fieldsArray,
    asyncOnLoad,
    asyncOnSubmit,
    asyncOnChange,
    asyncOnAutoSave,
  });
  const [message, setMessage] = useState('');
  const [updates, setUpdates] = useState(0);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fields, sF] = useState(fieldsArray);
  const [title, setTitle] = useState(formTitleComponent);
  const [result, setResult] = useState([]);
  const [ready, setReady] = useState(true);
  const [submitButton, setSubmitButton] = useState(submitComponent);
  const setFieldsResults = (fieldName, value, saved) => {
    const index = result.findIndex((r) => r.name === fieldName);
    if (index >= 0) {
      result[index].value = value;
    } else {
      result.push({ name: fieldName, value, saved });
    }
    setResult(result);
  };
  const modField = async (fieldName) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = fields.findIndex((f) => f.name == fieldName);
        if (index >= 0) {
          resolve(index);
        }
        reject(null);
      }, 50);
    });
  };

  const setFields = (fields) => {
    sF(fields);
    setLoading(false);
  };

  const setOptions = (fieldName, options) => {
    modField(fieldName).then((index) => {
      fields[index]['data-options'] = options;
      setFields(fields);
    });
  };

  const setFieldValue = (fieldName, value, saved) => {
    const field = document.querySelector('[name="' + fieldName + '"]');
    field.value = value;
    setFieldsResults(fieldName, value, saved);
  };

  const setFieldSrc = (fieldName, src) => {
    modField(fieldName).then((index) => {
      fields[index].src = src;
      setFields(fields);
    });
  };

  const addField = (field) => {
    modField(field.name)
      .then(() => {
        setFields(fields);
      })
      .catch((err) => {
        fields.push(field);
        setFields(fields);
      });
  };

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
    setFieldValue,
    errors,
    setErrors,
    updates,
    setUpdates,
    addField,
    setFieldSrc,
    setFieldsResults
  };
}
