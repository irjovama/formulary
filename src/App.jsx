import './App.css';
import useFormulary from './hook/use-formulary';
import Formulary from './components/formulary';
import { Component, useEffect, useState } from 'react';
import { defaultImage } from './utils/default-image';
import { styled } from 'styled-components';
const StyledInput = styled.input`
  padding: 1rem;
  background-color: lightblue;
  border-radius: 10px;
`;

const StyledLabel = styled.label`

  text-align: left;

`

function App() {
  const [changes, setChanges] = useState(0);
  useEffect(() => {}, [changes]);

  const context = useFormulary({
    formTitleComponent: 'Datos personales',
    loadingComponent: 'loading..',
    submitComponent: <button type="submit">Continuar</button>,
    asyncOnChange: async () => {},
    asyncOnLoad: async (fields) => {
      // await sleep(1000);
      return [
        {
          name: 'firstName',
          value: 'Hola mundo',
        },
        {
          name: 'ineReverso',
          src: defaultImage,
        },
      ];
    },
    asyncOnSubmit: async () => {},
    asyncOnAutoSave: async () => {},
    fieldsArray: [
      {
        name: 'firstName',
        options: ["irving", "jones"],
        inputComponent: <StyledInput  />,
        labelComponent: <StyledLabel>Nombre Principal</StyledLabel>,
        flexDirection: "column",
      },
      {
        name: 'ineReverso',
        inputComponent: <StyledInput  type='file' />,
        labelComponent: <StyledLabel>Ine por el reverso</StyledLabel>,
        flexDirection: "column",
      },
    ],
  });

  return (
    <div style={{ width: '100%' }}>
      <button
        onClick={() => {
          context.setTitle('Nuevo Titulo');
          setChanges(changes + 1);
        }}
      >
        Cambiar titulo
      </button>

      <button
        onClick={() => {
          context.addField({
            name: 'ineFrente',
            label: 'Ine por el Frente',
            type: 'file',
            'data-filetype': 'image',
            style: fileInputStyle,
          });
          setChanges(changes + 1);
        }}
      >
        Agregar un campo
      </button>

      <button
        onClick={() => {
          context.setFields([
            {
              name: 'phone',
              label: 'Telefono',
              type: 'text',
              style: inputStyle,
            },
            {
              name: 'state',
              label: 'Estado',
              type: 'text',
              style: inputStyle,
            },
            {
              name: 'gafete',
              label: 'Foto para gafete',
              type: 'file',
              'data-filetype': 'image',
              style: fileInputStyle,
            },
          ]);
          setChanges(changes + 1);
        }}
      >
        cambiar todos los campos
      </button>

      <button
        onClick={() => {
          context.setOptions('state', ['Michoacan', 'Guanajuato']);
          setChanges(changes + 1);
        }}
      >
        Agregar opciones a estado
      </button>

      <button
        onClick={() => {
          context.setFieldValue('phone', '4434858687');
          setChanges(changes + 1);
        }}
      >
        Agregar valor a telefono
      </button>

      <button
        onClick={() => {
          context.setFieldSrc('gafete', defaultImage);
          setChanges(changes + 1);
        }}
      >
        Agregar src al gafete
      </button>

      <Formulary context={context} />
    </div>
  );
}
// const StyledComponent = function (params) {
//   return <input style={{ background: 'green' }} {...params}  />;
// };

// const SomeClass = function () {
//   const inputParams = StyledComponent() ;

//   const styledInput = <input {...inputParams.props} />

//   return <form>{styledInput}</form>;
// };
export default App;
