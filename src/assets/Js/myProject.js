let dataProject = [];

function addedProject(event) {
  event.preventDefault();

  let projectName = document.getElementById("inputProject").value;
  let startDate = document.getElementById("inputStartDate").value;
  let endDate = document.getElementById("inputEndDate").value;
  let description = document.getElementById("inputDescription").value;
  let image = document.getElementById("inputImage").files;

  const node = '<i class="fa-brands fa-node-js"></i>';
  const golang = ' <i class="fa-brands fa-golang"></i>';
  const react = '<i class="fa-brands fa-react"></i>';
  const javascript = '<i class="fa-brands fa-square-js"></i>';

  let nodeChecked = document.getElementById("nodejs").checked ? node : "";
  let golangChecked = document.getElementById("golang").checked ? golang : "";
  let reactChecked = document.getElementById("reactjs").checked ? react : "";
  let javascriptChecked = document.getElementById("javascript").checked
    ? javascript
    : "";

  image = URL.createObjectURL(image[0]);
  // console.log(image);

  let getDistanceTime = distanceTime();

  let projectDataObject = {
    projectName,
    startDate,
    endDate,
    getDistanceTime,
    nodeChecked,
    golangChecked,
    reactChecked,
    javascriptChecked,
    description,
    image,
  };

  dataProject.push(projectDataObject);
  // console.log(dataProject);

  renderProject();
}

function renderProject() {
  document.getElementById("container-card").innerHTML = "";
  for (let i = 0; i < dataProject.length; i++) {
    document.getElementById("container-card").innerHTML += `
    <div class="card">
    <div class="image-project">
      <img src="${dataProject[i].image}" alt="image-project" />
    </div>
    <div class="title-and-duration">
      <h3>
        <a href="detail-project.html">${dataProject[i].projectName}</a>
      </h3>
      <p>Duration: ${dataProject[i].getDistanceTime}</p>
    </div>
    <div class="description-project">
      <p>
        ${dataProject[i].description}
      </p>
    </div>
    <div class="tech-project">
      ${dataProject[i].nodeChecked}
      ${dataProject[i].golangChecked}
      ${dataProject[i].reactChecked}
      ${dataProject[i].javascriptChecked}
    </div>
    <div class="button-group">
      <div class="btn-edit">
        <button type="button">Edit</button>
      </div>
      <div class="btn-delete">
        <button type="button">Delete</button>
      </div>
    </div>
  </div>
    `;
  }
}

function distanceTime() {
  let startDate = new Date(document.getElementById("inputStartDate").value);
  let endDate = new Date(document.getElementById("inputEndDate").value);
  let distance = new Date(endDate) - new Date(startDate);
  let days = Math.floor(distance / (1000 * 3600 * 24));
  let weeks = Math.floor(distance / (1000 * 3600 * 24 * 7));
  let months = Math.floor(distance / (1000 * 3600 * 24 * 30));
  let years = Math.floor(distance / (1000 * 3600 * 24 * 30 * 12));

  if (years == 1) {
    return `${years} year`;
  } else if (years > 0) {
    return `${years} years`;
  } else if (months == 1) {
    return `${months} month`;
  } else if (months > 0) {
    return `${months} months`;
  } else if (weeks == 1) {
    return `${weeks} week`;
  } else if (weeks > 0) {
    return `${weeks} weeks`;
  } else if (days == 1) {
    return `${days} day`;
  } else if (days > 0) {
    return `${days} days`;
  }
}
