
export function FieldConstructor({ context, field }) {
  const inputComponent = field?.inputComponent ? (
    field.inputComponent
  ) : (
    <input />
  );

  switch (inputComponent.props.type) {
    case 'file':
      return ImageInput(context, field, inputComponent);

    default:
      return Input(context, field, inputComponent);
  }
}

function ImageInput(context, field, component) {
  const previewComponent = field?.previewComponent ? (
    { ...field.previewComponent, props: { src: field?.src ? field.src : '' } }
  ) : (
    <></>
  );

  const labelComponent = field?.labelComponent ? (
    field.labelComponent
  ) : (
    <label>{field.name}</label>
  );
  const InputComponent = {
    ...component,
    props: {
      ...component.props,
      name: field.name,
      list: field.name + '-list',
      disabled: context.loading ? true : component.props.disabled,
    },
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: field.flexDirection,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap:"5px"
      }}
    >
      {labelComponent}
      {InputComponent}

      {previewComponent}
    </div>
  );
}

function Input(context, field, component) {
  const options = field?.options || [];
  const labelComponent = field?.labelComponent ? (
    field.labelComponent
  ) : (
    <label>{field.name}</label>
  );
  const InputComponent = {
    ...component,
    props: {
      ...component.props,
      name: field.name,
      list: field.name + '-list',
      disabled: context.loading ? true : component.props.disabled,
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: field.flexDirection,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap:"5px"
      }}
    >
      {labelComponent}
      {InputComponent}
      <datalist id={field.name + '-list'}>
        {options.map((o) => {
          return <option value={o} key={o} />;
        })}
      </datalist>
    </div>
  );
}
