export function setSavedResults(context) {
  if (getUnsavedResults(context)) {
    context.setResult(
      context.result.map((r) => {
        r.saved = true;
        return r;
      })
    );
  }
}

export function getUnsavedResults(context) {

  return context?.result && context.result.length > 0
    ? context.result.filter((r) => !r?.saved)
    : [];
}
