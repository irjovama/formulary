import { getUnsavedResults, setSavedResults } from './saved-results';
import { validations } from './validations';

export async function handleLoader(context, asyncCallback) {
  context.setLoading(true);
  await asyncCallback();
  context.setLoading(false);
}

export async function handleAutoSave(context) {
  if (updates > 0 && ready && context.errors.length == 0) {
    let timerId;
    const handleInputChange = async () => {
      /*aqui va la logica*/
    };

    clearTimeout(timerId);
    timerId = setTimeout(handleInputChange, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }
}
export async function handleOnLoad(context) {
  if (context?.asyncOnLoad) {
    const datums = await context.asyncOnLoad(context.fields);

    for (let datum of datums) {

      if (datum?.src) {
        context.setFieldSrc(datum.name, datum.src);
      } else {
        context.setFieldValue(datum.name, datum.value, true);
      }
    }
  }
}

export async function handleSubmit(e, context) {
  e.preventDefault()
  console.log(context.result)
}
export function handleChange(e, context) {
  const element = e.target;
  context.setFieldsResults(element.name, element.value, false);
  
}


async function urlToBase64(element, context) {
  context.setLoading(true);
  const result = await new Promise((resolve, reject) => {
    if (element?.files) {
      const selectedFile = element.files[0];

      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = function (ev) {
          const base64String = ev.target.result;
          resolve(base64String);
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        resolve('');
      }
    } else {
      resolve('');
    }
  });
  context.setLoading(false);
  return result;
}
