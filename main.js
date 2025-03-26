import { createInterface } from "readline";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const pregunta = (query) => {
  return new Promise((resolve) => {
    readline.question(query, (answer) => {
      resolve(answer);
    });
  });
};

const registrarPersonas = async () => {
  const personas = [];

  while (true) {
    const nombre = await pregunta("Ingrese el nombre: ");
    const apellido = await pregunta("Ingrese el apellido: ");
    const dni = await pregunta("Ingrese el DNI: ");

    const telefonos = [];

    while (true) {
      const telefono = await pregunta(
        `Ingrese teléfono para ${nombre} (Enter para finalizar): `
      );

      if (telefono === "") {
        if (telefonos.length === 0) {
          console.log("Debe ingresar al menos un teléfono.");
          continue;
        }
        break;
      }

      telefonos.push(telefono);
    }

    const persona = [nombre, apellido, dni, telefonos];
    personas.push(persona);

    const continuar = await pregunta("¿Desea registrar otra persona? (s/n): ");
    if (continuar.toLowerCase() !== "s") break;
  }

  console.log("\n--- Personas Registradas ---");
  console.log(JSON.stringify(personas, null, 2));

  personas.forEach((persona) => {
    console.log(persona);
  });

  readline.close();
};

registrarPersonas();
