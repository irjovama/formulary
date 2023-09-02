import { getUnsavedResults, setSavedResults } from './saved-results';
import { validations } from './validations';

export async function handleLoader(context, asyncCallback) {
  context.setLoading(true);
  await asyncCallback();
  context.setLoading(false);
}

export async function handleAutoSave(context) {
  if (context?.asyncOnAutoSave) {
    context.setLoading(true);
    const results = getUnsavedResults(context);
    context.asyncOnAutoSave(results).then((autoSaveResult) => {
      if (autoSaveResult === true) {
        context.setLoading(false);
        setSavedResults(context);
      }
    });
  }
}
export async function handleOnLoad(context) {
  if (context?.asyncOnLoad) {
    const datums = await context.asyncOnLoad(
      context.fields.map((field) => field.name)
    );

    for (let datum of datums) {
      if (datum?.src) {
        context.setFieldSrc(datum.name, datum.src);
      } else {
        context.setFieldValue(datum.name, datum.value, true);
      }

      if (datum?.id) {
        context.setFieldResultProp(datum.name, { id: datum.id });
      }
    }
  }
  context.setUpdates(0);
}

export async function handleSubmit(e, context) {
  e.preventDefault();
  if (context.asyncOnSubmit) {
    context.setLoading(true);
    const results = getUnsavedResults(context);
    context.asyncOnSubmit(results).then((submitResult) => {
      if (submitResult === true) {
        setSavedResults(context);
        context.setLoading(false);
      }
    });
  }
}
export async function handleChange(e, context) {
  const element = e.target;
  context.setUpdates(context.updates + 1);
  if (element?.files) {
    const file = element.files[0];
    const src = await urlToBase64(file);
    context.setFieldResult(element.name, file, false);
    context.setFieldSrc(element.name, src);
  } else {
    context.setFieldResult(element.name, element.value, false);
  }
}

async function urlToBase64(selectedFile) {
  const result = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (ev) {
      const base64String = ev.target.result;
      resolve(base64String);
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.readAsDataURL(selectedFile);
  });

  return result;
}
