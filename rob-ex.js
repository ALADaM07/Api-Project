/**
 * We expect data to be an object with the property 'results'.
 * The 'results' property is an array of objects with the following structure:
 *
 * {
 *   type: 'cat' or 'dog',
 *   name: <any string>
 * }
 *
 * We also assume that there is a `ul` element already in the DOM with the id 'catlist' and 'doglist'
 */
// const convertData = (data) => {
//     const { results } = data;
//     let cats;
//     let dogs;

//     results.forEach((result) => {
//       if (result.type === "cat") {
//         const catList = document.getElementById("catlist");
//         const cat = document.createElement("li");
//         cat.innerText = result.name;
//         catList.appendChild(cat);
//         cats.push(result);
//       } else {
//         const dogList = document.getElementById("doglist");
//         const dog = document.createElement("li");
//         dog.innerText = result.name;
//         dogList.appendChild(dog);
//         dogs.push(result);
//       }
//     });

//     return {
//       cats,
//       dogs,
//     };
//   };

const convertData = (data) => {
  const { results } = data;
  let cats = [];
  let dogs = [];
  const catList = document.getElementById('catlist');
  const dogList = document.getElementById('doglist');

  results.forEach((result) => {
    const liElement = document.createElement('li');
    const name = result.name;
    if (result.type === 'cat') {
      liElement.innerText = name;
      catList.appendChild(liElement);
      cats.push(result);
    } else {
      liElement.innerText = name;
      dogList.appendChild(liElement);
      dogs.push(result);
    }
  });

  return {
    cats,
    dogs,
  };
};
