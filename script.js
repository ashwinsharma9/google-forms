let fName = document.querySelector(".f_Name");
let lName = document.querySelector(".l_Name");
let email = document.querySelector(".e_mail");
let mNumber = document.querySelector(".m_Number");

let btnSubmit = document.querySelector(".submitButton")

let form = document.querySelector(".myform")

// No need to add event to button with form element
// btnSubmit.addEventListener("click", function(){
//     console.log(fName.value)
// })


form.addEventListener("submit", function(e) {
    e.preventDefault(); 

    const formData = {
        firstName: fName.value,
        lastName: lName.value,
        email: email.value,
        mobileNumber: mNumber.value
    };

    // Send the form data to the server using fetch
    fetch("http://localhost:3000/submit-form", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); 
        // Optionally, reset the form or display a success message on the UI

        let formResponseUI = document.createElement('h2');
        formResponseUI.textContent = data.message;

        document.querySelector('.heading').replaceWith(formResponseUI);

        setTimeout(() => {
            formResponseUI.remove();
        }, 3000);

        form.reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
