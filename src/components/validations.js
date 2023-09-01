export function validations(context, e) {
  const element = e.target;
  console.log(typeof element.dataset.regex)
  if (element.dataset?.list && element.dataset.strict == 'true') {
    if (
      element.dataset.list
        .split(',')
        .map((o) => String(o).toUpperCase())
        .includes(String(element.value).toUpperCase())
    ) {
      const indexError = context.errors.findIndex((err) => {
        return err.fieldName == element.dataset.label;
      });

      context.errors.splice(indexError, 1);
    } else {
      const indexError = context.errors.findIndex((err) => {
        return err.fieldName == element.dataset.label;
      });
      if (indexError >= 0) {
        context.errors[indexError].message = 'invalid Optión';
      } else {
        context.errors.push({
          fieldName: element.dataset.label,
          message: 'invalid Optión',
        });
      }
    }
  }
  context.setErrors(context.errors);
  if (context.errors.length > 0) {
    return false;
  }

  return true;
}
