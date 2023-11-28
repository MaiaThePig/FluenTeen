import {readdirSync} from "fs";
import {resolve} from "path";

//So we can use __dirname
const __dirname = decodeURI(new URL('.', import.meta.url).pathname.slice(3));
const publicDir = resolve("public"); 
const routesDir = resolve("routes");

async function readPublic(){
  const o = {};

  //Make it so every .js /public file gets their cb imported
  //So we have an object with the prop as the path and cb as the value
  const files = readdirSync(publicDir);
  
  //Since import is synchronous, we can't just use a forEach
  //Using one would not update the object correctly
  for(let x = 0; x < files.length; x++){
    const file = files[x];
    const fileDir = `file:///${resolve(publicDir, file)}`;

    const moduleValue = await import(fileDir);
    const {path, cb} = moduleValue.default;

    o[path] = cb;
  }

  return o;
}

async function readRoutes(){
  const o = {
    "GET": await readPublic(), //all pages are GET
    "POST": {}
  }

  const methodsDir = readdirSync(routesDir);

  for(let x = 0; x < methodsDir.length; x++){
    const method = methodsDir[x];
    const methodRoutesFiles = readdirSync(
      resolve(routesDir, methodsDir[x])
    );

    for(let y = 0; y < methodRoutesFiles.length; y++){
      const file = methodRoutesFiles[y];
      const fileDir = `file:///${resolve(routesDir, method, file)}`;

      const moduleValue = await import(fileDir);
      const {path, cb} = moduleValue.default;

      o[method][path] = cb;
    }

  }

  return o;
}

export default readRoutes;
