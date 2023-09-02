// import './App.css';
// import useFormulary from './hook/use-formulary';
// import Formulary from './components/formulary';
// import {  useEffect, useState } from 'react';
// import { defaultImage } from './utils/default-image';
// import { styled } from 'styled-components';
// const StyledInput = styled.input`
//   padding: 1rem;
//   background-color: lightblue;
//   border-radius: 10px;
//   width: 100%;
// `;

// const StyledLabel = styled.label`
//   text-align: left;
//   width: 100%;
// `;
// const StyledImage = styled.img`
//   width: 100px;
//   height: auto;
// `;

// const sleep = async (ms) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(true);
//     }, ms);
//   });
// };
// function App() {
//   const [changes, setChanges] = useState(0);
//   useEffect(() => {}, [changes]);

//   const context = useFormulary({
//     formTitleComponent: 'Datos personales',
//     loadingComponent: 'loading..',
//     submitComponent: <button type="submit">Continuar</button>,
//     asyncOnChange: async (event) => {
//       console.log('cambiando',event.target.name,  event.target.value);
//     },
//     asyncOnLoad: async (fields) => {
//       console.log('onload', fields);
//       return [
//         {
//           id: 11,
//           name: 'firstName',
//           value: 'Hola mundo',
//         },
//         {
//           id: 15,
//           name: 'ineReverso',
//           src: defaultImage,
//         },
//       ];
//     },
//     asyncOnSubmit: async (result) => {
//       await sleep(1000);
//       console.log('submit', result);
//       return true;
//     },
//     asyncOnAutoSave: async (result) => {
//       await sleep(1000);
//       console.log('autosave', result);
//       return true;
//     },
//     fieldsArray: [
//       {
//         name: 'firstName',
//         inputComponent: <StyledInput required={true} />,
//         labelComponent: <StyledLabel>Nombre Principal</StyledLabel>,
//         flexDirection: 'column',
//       },
//       {
//         name: 'ineReverso',
//         inputComponent: <StyledInput type="file" required={true} />,
//         labelComponent: <StyledLabel>Ine por el reverso</StyledLabel>,
//         flexDirection: 'column',
//         previewComponent: <StyledImage />,
//       },
//     ],
//   });

//   return (
//     <div style={{ width: '100%' }}>
//       <button
//         onClick={() => {
//           context.setTitle('Nuevo Titulo');
//           setChanges(changes + 1);
//         }}
//       >
//         Cambiar titulo
//       </button>

//       <button
//         onClick={() => {
//           context.addField({
//             name: 'ineFrente',
//             inputComponent: <StyledInput type="file" required={true} />,
//             labelComponent: <StyledLabel>Ine por el frente</StyledLabel>,
//             flexDirection: 'column',
//             previewComponent: <StyledImage />,
//           });
//           setChanges(changes + 1);
//         }}
//       >
//         Agregar un campo
//       </button>

//       <button
//         onClick={() => {
//           context.setFields([
//             {
//               name: 'phone',
//               inputComponent: <StyledInput type="number" required={true} />,
//               labelComponent: <StyledLabel>Telefono Principal</StyledLabel>,
//               flexDirection: 'column',
//             },
//             {
//               name: 'state',
//               inputComponent: <StyledInput required={true} />,

//               labelComponent: (
//                 <StyledLabel>Estado de la republical</StyledLabel>
//               ),
//               flexDirection: 'column',
//             },
//             {
//               name: 'gafete',
//               inputComponent: <StyledInput type="file" required={true} />,
//               labelComponent: <StyledLabel>Foto para gafete</StyledLabel>,
//               flexDirection: 'column',
//               previewComponent: <StyledImage />,
//             },
//           ]);
//           setChanges(changes + 1);
//         }}
//       >
//         cambiar todos los campos
//       </button>

//       <button
//         onClick={() => {
//           context.setOptions('state', ['Michoacan', 'Guanajuato']);
//           setChanges(changes + 1);
//         }}
//       >
//         Agregar opciones a estado
//       </button>

//       <button
//         onClick={() => {
//           context.setFieldValue('phone', '4434858687');
//           context.setFieldProp('phone', { readOnly: true });
//           setChanges(changes + 1);
//         }}
//       >
//         Agregar valor a telefono
//       </button>

//       <button
//         onClick={() => {
//           context.setFieldSrc('gafete', defaultImage);
//           setChanges(changes + 1);
//         }}
//       >
//         Agregar src al gafete
//       </button>

//       <Formulary context={context} />
//     </div>
//   );
// }

// export default App;
