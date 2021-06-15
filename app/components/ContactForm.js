export function ContactForm() {
  const d = document,
    $form = d.createElement("form"),
    $styles = d.getElementById("dynamic-styles");

  $form.classList.add("contact-form");

  $styles.innerHTML = `
    :root {
        --main-font: sans-serif;
        --font-size: 16px;
      }

      html {
        box-sizing: border-box;
        font-family: sans-serif;
        font-size: 16px;
      }

      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }

      /********************************************CONTACTFORM VALIDATIONS**********************/
      .contact-form {
        --form-ok-color: #4caf50;
        --form-error-color: #f44336;
        margin-left: auto;
        margin-right: auto;
        width: 80%;
      }

      .contact-form > * {
        /* ">*" todos los hijos directs*/
        padding: 0.5rem;
        margin: 1rem auto;
        display: block;
        width: 100%;
      }

      .contact-form textarea {
        resize: none;
      }

      .contact-form legend,
      .contact-form-response {
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
      }

      .contact-form input,
      .contact-form textarea {
        font-size: 1rem;
        font-family: sans-serif;
      }

      .contact-form input[type="submit"] {
        /*todos los input de tipo submit*/
        width: 50%;
        font-weight: bold;
        cursor: pointer;
      }

      .contact-form *::placeholder {
        /*todos los que tengan el placeholder*/
        color: #000;
      }

      .contact-form [required]:valid { 
        /*all the fields that have required and have valid content*/
        border: thin solid var(--form-ok-color);
      }

      .contact-form [required]:invalid {
        /*all the fields that have required and have invalid content*/
        border: thin solid var(--form-error-color);
      }

      .contact-form-error {
        margin-top: -1rem;
        font-size: 80%;
        background-color: var(--form-error-color);
        color: #fff;
        transition: all 800ms ease;
      }

      .contact-form-error.is-active {
        display: block;
        animation: show-message 1s 1 normal 0s ease-out both; /*both: va a conservar los estilos con que la animación termina.*/
      }

      .contact-form-loader {
        text-align: center;
      }

      .none {
        display: none;
      }

      @keyframes show-message {
        0% {
          visibility: hidden;
          opacity: 0;
        }

        100% {
          visibility: visible;
          opacity: 1;
        }
      }
    `;

  $form.innerHTML = `
    <legend>Send your comments</legend>
    <input
      type="text"
      name="name"
      placeholder="Write your name"
      title="Name just accept letters and blanks"
      pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\\s]+$"
      required
    />
    <input
      type="email"
      name="email"
      placeholder="Write your email"
      title="Incorrect email "
      pattern="^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$"
      required
    />
    <input
      type="text"
      name="subject"
      placeholder="Matter to be discussed"
      title="The matter is required"
      required
    />
    <textarea
      name="comments"
      cols="50"
      rows="5"
      placeholder="Write your comments"
      data-pattern="^.{1,255}$"
      title="You comment must not exceed 255 characters."
      required
    ></textarea>
    <input type="submit" value="Send" />
    <div class="contact-form-loader none">
      <img src="../assets/oval.svg" alt="Loading" />
    </div>
    <div class="contact-form-response none">
      <p>The data have been send</p>
    </div>
    `;

    

    function validationsForm() {
     const $form = d.querySelector(".contact-form"),
       $inputs = d.querySelectorAll(".contact-form [required]");

     $inputs.forEach((input) => {
       const $span = d.createElement("span");
       $span.id = input.name;
       $span.textContent = input.title;
       $span.classList.add("contact-form-error", "none");
       input.insertAdjacentElement("afterend", $span);
     });

     d.addEventListener("keyup", (e) => {
       if (e.target.matches(".contact-form [required]")) {
         let $input = e.target, //es el input quién origina el e.target en este caso
           pattern = $input.pattern || $input.dataset.pattern;

         // console.log($input, pattern);

         if (pattern && $input.value !== "") {
           // console.log("El input tiene patrón");

           let regex = new RegExp(pattern);
           return !regex.exec($input.value)
             ? d.getElementById($input.name).classList.add("is-active")
             : d.getElementById($input.name).classList.remove("is-active");
         }

         if (!pattern) {
           // console.log("El input NO tiene patrón");
           return $input.value === ""
             ? d.getElementById($input.name).classList.add("is-active")
             : d.getElementById($input.name).classList.remove("is-active");
         }
       }
     });

     d.addEventListener("submit", (e) => {
       e.preventDefault();
       alert("Sending the form");

       const $loader = d.querySelector(".contact-form-loader"),
         $response = d.querySelector(".contact-form-response");

       $loader.classList.remove("none");

       fetch("https://formsubmit.co/ajax/vitomf98@gmail.com", {
         method: "POST",
         body: new FormData(e.target) //en este caso el e.target es el formulario.
       })
         .then(res=> res.ok ? res.json(): Promise.reject(res))
         .then(json => {
           console.log(json);
           $loader.classList.add("none");
           $response.classList.remove("none");
           $response.innerHTML = `<p>${json.message}</p>`
           $form.reset(); //reseta los datos del formulario.

         })
         .catch(err=> {
           console.log(err);
           let message = err.statusText || "An error occurred, try again";
           $response.innerHTML = `<p>Error ${err.status}: ${message}</p>`; 
         })
         .finally(()=> setTimeout(()=> {
           $response.classList.add("none");
           $response.innerHTML = "";
         }));

     
     });
   }

   setTimeout(()=> {
       validationsForm();
   },100)
  return $form;
}
