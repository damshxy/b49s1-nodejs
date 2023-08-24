const promise = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  const npointURL = "https://api.npoint.io/96e76bcae557a909e162";

  xhr.open("GET", npointURL, true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      resolve(JSON.parse(xhr.response));
    } else {
      reject("Error Loading Data");
    }
  };

  xhr.onerror = () => {
    reject("Network error");
  };

  xhr.send();
});

async function getAllTestimonialData() {
  try {
    const response = await promise;

    let testimonialHTML = "";

    response.forEach((item) => {
      testimonialHTML += `
      <div class="card-testimonial">
      <div class="image-testimonial">
         <img src="${item.image}" alt="image-testimonial"/>
       </div>
       <div class="desc-testimonial">
         <p>"${item.desc}"</p>
       </div>
       <div class="author-testimonial">
         <h5>- ${item.author}</h5>
       </div>
       <div class="stars-rating">
         <p>${item.rating}<i class="fa-solid fa-star"></i></p>
         </div>
     </div>
      `;
    });

    document.getElementById("testimonials").innerHTML = testimonialHTML;
  } catch (err) {
    console.log(err);
  }
}

getAllTestimonialData();

async function getFilteredTestimonials(rating) {
  try {
    const res = await promise;

    const testimonialsFiltered = res.filter((item) => {
      return item.rating === rating;
    });

    let testimonialsHTML = "";

    if (testimonialsFiltered.length === 0) {
      testimonialsHTML = `<h3>Data Not Found !</h3>`;
    } else {
      testimonialsFiltered.forEach((item) => {
        testimonialsHTML += `
    <div class="card-testimonial">
    <div class="image-testimonial">
       <img src="${item.image}" alt="image-testimonial"/>
     </div>
     <div class="desc-testimonial">
       <p>"${item.desc}"</p>
     </div>
     <div class="author-testimonial">
       <h5>- ${item.author}</h5>
     </div>
     <div class="stars-rating">
       <p>${item.rating}<i class="fa-solid fa-star"></i></p>
       </div>
   </div>
    `;
      });
    }
    document.getElementById("testimonials").innerHTML = testimonialsHTML;
  } catch (err) {
    console.log(err)
  }
}
