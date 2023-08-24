// class Testimonial {
//   #desc = "";
//   #image = "";

//   constructor(desc, image) {
//     this.#desc = desc;
//     this.#image = image;
//   }

//   get desc() {
//     return this.#desc;
//   }

//   get image() {
//     return this.#image;
//   }

//   get author() {
//     throw new Error("getAuthor() method must be implemented.");
//   }

//   get testimonialHTML() {
//     return `
//             <div class="card-testimonial">
//                 <div class="image-testimonial">
//                     <img src="${this.image}" alt="image-testimonial"/>
//                 </div>
//                 <div class="desc-testimonial">
//                     <p>"${this.desc}"</p>
//                 </div>
//                 <div class="author-testimonial">
//                     <h5>- ${this.author}</h5>
//                 </div>
//             </div>
//         `;
//   }
// }

// class AuthorTestimonial extends Testimonial {
//   #author = "";

//   constructor(author, desc, image) {
//     super(desc, image);
//     this.#author = author;
//   }

//   get author() {
//     return this.#author;
//   }
// }

// class CompanyTestimonial extends Testimonial {
//   #company = "";

//   constructor(author, desc, image) {
//     super(desc, image);
//     this.#company = author;
//   }

//   get author() {
//     return this.#company + " Company";
//   }
// }

// const testimonial1 = new AuthorTestimonial(
//   "Anna Maria",
//   "Mantap Sekali Jasanya",
//   "https://images.unsplash.com/photo-1691655245135-cccad4661ba8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
// );

// const testimonial2 = new AuthorTestimonial(
//   "Sheldon",
//   "Mantap Sekali Jasanya",
//   "https://images.unsplash.com/photo-1688405054790-4e5e98a9e81b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
// );

// const testimonial3 = new AuthorTestimonial(
//   "Shavana",
//   "Mantap Sekali Jasanya",
//   "https://images.unsplash.com/photo-1688607933876-5ceae237a177?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
// );

// const testimonial4 = new AuthorTestimonial(
//   "Senya Mittin",
//   "Mantap Sekali Jasanya",
//   "https://images.unsplash.com/photo-1691162534642-eb3779a8c231?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
// );

// let testimonialData = [testimonial1, testimonial2, testimonial3, testimonial4];
// let testimonialHTML = "";

// for (let i = 0; i < testimonialData.length; i++) {
//   testimonialHTML += testimonialData[i].testimonialHTML;
// }

// document.getElementById("testimonials").innerHTML = testimonialHTML;

// Array of object

// const testimonialData = [
//   {
//     author: "Anna Maria",
//     desc: "Mantap Sekali Jasanya",
//     image:
//       "https://images.unsplash.com/photo-1691655245135-cccad4661ba8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
//     rating: 2,
//   },
//   {
//     author: "Sheldon",
//     desc: "Mantap Sekali Jasanya",
//     image:
//       "https://images.unsplash.com/photo-1688405054790-4e5e98a9e81b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
//     rating: 1,
//   },
//   {
//     author: "Shavana",
//     desc: "Mantap Sekali Jasanya",
//     image:
//       "https://images.unsplash.com/photo-1688607933876-5ceae237a177?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
//     rating: 5,
//   },
//   {
//     author: "Senya Mittin",
//     desc: "Mantap Sekali Jasanya",
//     image:
//       "https://images.unsplash.com/photo-1691162534642-eb3779a8c231?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
//     rating: 4,
//   },
// ];

// function allTestimonialData() {
//   let testimonialHTML = "";

//   testimonialData.forEach(function (item) {
//     testimonialHTML += `
//     <div class="card-testimonial">
//     <div class="image-testimonial">
//        <img src="${item.image}" alt="image-testimonial"/>
//      </div>
//      <div class="desc-testimonial">
//        <p>"${item.desc}"</p>
//      </div>
//      <div class="author-testimonial">
//        <h5>- ${item.author}</h5>
//      </div>
//      <div class="stars-rating">
//        <p>${item.rating}<i class="fa-solid fa-star"></i></p>
//        </div>
//    </div>
//     `;
//   });

//   document.getElementById('testimonials').innerHTML = testimonialHTML
// }

// allTestimonialData()

// function filterTestimonial(rating) {
//   let testimonialHTML = ''

//   const testimonialFiltered = testimonialData.filter(function (item) {
//     return item.rating === rating
//   })

//   if (testimonialFiltered == 0) {
//     testimonialHTML = `<h1>Data Not Found</h1>`
//   } else {
//     testimonialFiltered.forEach(function (item) {
//       testimonialHTML += `
//       <div class="card-testimonial">
//       <div class="image-testimonial">
//          <img src="${item.image}" alt="image-testimonial"/>
//        </div>
//        <div class="desc-testimonial">
//          <p>"${item.desc}"</p>
//        </div>
//        <div class="author-testimonial">
//          <h5>- ${item.author}</h5>
//        </div>
//        <div class="stars-rating">
//          <p>${item.rating}<i class="fa-solid fa-star"></i></p>
//          </div>
//      </div>
//       `
//     })
//   }

//   document.getElementById('testimonials').innerHTML = testimonialHTML
// }