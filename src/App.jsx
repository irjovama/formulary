import { useEffect } from 'react';

import './App.css';
import useFormulary from './hook/use-formulary';
import Formulary from './components/formulary';
const inputStyle = {
  padding: '5px',
};
async function sleep(fields) {
  if (fields.length > 0) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{"lat":20.0163943,"lng":-100.7303244}',
    };

    await fetch('https://geometry-telmex.vercel.app/validate', options);
  }
}
function App() {
  async function aditionalAction(){
    context.setOptions("firstName", ["opcoipn1","opcion2"])
  }
  async function handleSubmit(fields, form) {
    await sleep(fields);
    let title, newFields;
    switch (context.title) {
      case 'Datos personales':
        title = 'Direccion';
        newFields = [
          {
            name: 'street',
            label: 'Calle',
            type: 'text',
            defaultValue: "default",
            required: true,
            readOnly: false,
            style: inputStyle,
          },
        ];
        break;
      case 'Direccion':
        title = 'Gracias';
        newFields = [];
        break;
      default:
        break;
    }

    context.setTitle(title);
    context.setFields(newFields);
    return true;
  }
  async function handleLoadData(fields){
    // await sleep([1,1]);
    return [];
    // return [{name: "firstName", value: "Irving Jones"}]
  }
  const context = useFormulary({
    formTitle: 'Datos personales',
    loadingComponent: 'loading...',
    submitComponent: <button type="submit">Continuar</button>,
    asyncOnChange: aditionalAction,
    asyncOnLoad: handleLoadData,
    asyncOnSubmit: handleSubmit,
    asyncOnAutoSave: async (fields) => {
      await sleep(fields);
      return true;
    },
    fieldsArray: [
      {
        name: 'firstName',
        label: 'Nombre',
        type: 'text',
        required: true,
        readOnly: false,
        style: inputStyle,
      },
      {
        name: 'lastName',
        label: 'Apellido',
        type: 'text',
        required: true,
        readOnly: false,
        style: inputStyle,
        options: ["irving", "jones", "valdes", "maciel", "esta es otra opcion"]
      },
      {
        id: 'boton1',
        type: 'component',
        component: <button type="button" onClick={aditionalAction}>Accion adicional</button>,
      },
    ],
  });
  useEffect(() => {}, []);

  return (
    <>
      <Formulary context={context} />
    </>
  );
}

export default App;
