export function setSavedResults(context) {
  const results = getUnsavedResults(context);
  if (results.length > 0) {
    context.setUpdates(0);
    context.setResult(
      context.result.map((r) => {
        r.saved = true;
        return r;
      })
    );
  }
}

export function getUnsavedResults(context) {
  return context.result
    .filter((result) => result.saved == false)
    .map((result) => {
      return result?.id
        ? { name: result.name, value: result.value, id: result.id }
        : { name: result.name, value: result.value };
    });
}
