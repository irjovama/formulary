import { defaultImage } from '../utils/default-image';

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
      }}
    >
      {field.labelComponent}
      {InputComponent}

      <img src={field?.src ? field.src : defaultImage} />
    </div>
  );
}

function Input(context, field, component) {
  const options = field?.options || [];
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
      }}
    >
      {field.labelComponent}
      {InputComponent}
      <datalist id={field.name + '-list'}>
        {options.map((o) => {
          return <option value={o} key={o} />;
        })}
      </datalist>
    </div>
  );
}
