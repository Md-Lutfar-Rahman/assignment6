let data ;
let datasortBydate = false;
const loadAllData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => {
      // sortByDate(data.data.tools)
      displayTools(data.data.tools)});
}

const displayTools = (data) => {
  console.log(data);

  const cardsContainer = document.getElementById("card-container");
  cardsContainer.innerHTML = "";
  const newsliceddata = data.slice(0, 6);
  // retrived only first 6 data from the list
  newsliceddata.forEach((tool) => {

    const div = document.createElement("div");
    div.classList.add("col-sm-4");
    div.innerHTML = `
      
                    <div class="card mb-5">
                      <img src="${tool.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Features</h5>
                            <p class="card-title">1.${tool.features[0]}</p>
                            <p class="card-title">2.${tool.features[1]}</p>
                            <p class="card-title">3.${tool.features[2]}</p>
                           <hr>
                            <h5 class="card-text">${tool.name}</h5>
                            <div class="card-body d-flex justify-content-between">
                          <p class="card-text"><i class="fa fa-calendar" aria-hidden="true"></i>&nbsp${tool.published_in}</p>
                          <a type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="modalDetails(${tool.id})"><i class="fa-solid fa-arrow-right bg-danger"></i></a>
                        </div>
                        </div>
                        
                    </div>
                    
      `;
    cardsContainer.appendChild(div);
  });

}
const loadMore = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayTools(data.data.tools));

  const displayTools = (data) => {
    console.log(data);

    const cardsContainer = document.getElementById("card-container");
    cardsContainer.innerHTML = "";

    data.forEach((tool) => {

      const div = document.createElement("div");
      div.classList.add("col-sm-4");
      div.innerHTML = `
        
                      <div class="card mb-5">
                        <img src="${tool.image}" class="card-img-top" alt="...">
                          <div class="card-body">
                          <h5 class="card-title">Features</h5>
                          <p class="card-title">1.${tool.features[0]}</p>
                          <p class="card-title">2.${tool.features[1]}</p>
                          <p class="card-title">3.${tool.features[2]}</p>
                         <hr>
                          <h5 class="card-text">${tool.name}</h5>
                          <div class="card-body d-flex justify-content-between">
                          <p class="card-text"><i class="fa fa-calendar" aria-hidden="true"></i>&nbsp${tool.published_in}</p>
                          <a type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="modalDetails(${tool.id})"><i class="fa-solid fa-arrow-right bg-danger"></i></a>
                        </div>
                          </div>
                          
                      </div>
                      
        `;
      cardsContainer.appendChild(div);
    })

  }
  console.log('Loadmore Button is clicked')
}
const modalDetails = (id) => {
  const toolId = Number(id);
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/ai/tool/${toolId < 10 ? '0' + toolId : toolId}`
  fetch(url)
    .then(res => res.json())
    .then(data => modafunc(data))
}
const modafunc = (data) => {
  const modalBody = document.getElementById('modal-details');
  console.log(modalBody);
  console.log(data);
  const Data = data.data;
  modalBody.innerHTML = '';
  const newBody = document.createElement("div");

  const featuresArray = [];
  for (const data of Object.keys(Data.features)) {
    featuresArray.push(Data.features[data])
  }



  newBody.classList.add("row");
  newBody.innerHTML = `
  
    <div class="col-md-7">
      <div class="Mycontainer">
        <h4 ="p-10">${Data.description}</h4>
      
        <div class="pricing">
        ${Data?.pricing?.map(singleprice => `
          <p class="item">${singleprice?.price}</p>
          <p class="item">${singleprice?.plan}</p>
          `)}

        </div>
       <div class="featureintigration">
       <div class="feature">
       <h5>Features</h5>
    ${featuresArray.map(singleFeature =>`<p>${singleFeature.feature_name}</p>`)}
     </div>

     <div class="intigration">
       <h5>Integrations<h5>
       ${Data?.integrations ? (Data?.integrations.map(intg => `<p>${intg}</p>`)) : 'No Data Found' } 
     </div>
       </div>
        
      </div>
     
    </div>
  <div class="col-md-5 ">
    <img class="img-fluid " src="${Data?.image_link[0]}" alt="">
      <p class="badge bg-danger p-3 m-2 justify-content-center mx-auto">${Data?.accuracy?.score&&Data?.accuracy?.score * 100 + '% accuracy'}</p>
       <h2> ${Data.input_output_examples?Data?.input_output_examples[0]?.input:"No data found"} </h2>
       <p>${Data.input_output_examples?Data?.input_output_examples[0]?.output:"No data found"}</p>

  </div>

`;
  modalBody.appendChild(newBody)

}

// function sortByDate(arr) {
//   // Create a new array to avoid modifying the original array
//   const sortedArr = [...arr];
  
//   // Sort the new array by date
//   sortedArr.sort((a, b) => new Date(a.date) - new Date(b.date));
  
//   // Return the sorted array
//   console.log(sortedArr)
//   // return sortedArr;
// }
// sortByDate();
loadAllData();


