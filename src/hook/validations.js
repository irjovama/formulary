export default function validateFields({
  formTitleComponent,
  loadingComponent,
  submitComponent,
  fieldsArray,
  asyncOnLoad,
  asyncOnSubmit,
  asyncOnChange,
  asyncOnAutoSave,
}) {
  isNotNull('formTitleComponent', formTitleComponent);
  isNotNull('loadingComponent', loadingComponent);
  isNotNull('submitComponent', submitComponent);
  isArray('fieldsArray', fieldsArray);
  isAsyncFunction('asyncOnLoad', asyncOnLoad);
  isAsyncFunction('asyncOnSubmit', asyncOnSubmit);
  isAsyncFunction('asyncOnChange', asyncOnChange);
  isAsyncFunction('asyncOnAutoSave', asyncOnAutoSave);
}
function isNotNull(name, element) {
  if (element == undefined || element == null)
    throw new Error(name + ' cannot be null at useFormulary');
}

function isString(name, text) {
  if (text != undefined)
    if (typeof text !== 'string')
      throw new Error(name + ' must be a string at useFormulary');
}

function isArray(name, arr) {
  if (arr != undefined)
    if (typeof arr !== 'object')
      throw new Error(name + ' array must be an array at useFormulary');
}

function isAsyncFunction(name, fn) {
  if (fn != undefined) {
    if (
      typeof fn !== 'function' ||
      (fn instanceof Function && fn.constructor.name !== 'AsyncFunction')
    )
      throw new Error(name + ' must be async function at useFormulary');
  }
}
