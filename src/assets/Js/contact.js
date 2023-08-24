function submitContact() {
  let name = document.getElementById("input-name").value;
  let email = document.getElementById("input-email").value;
  let phone = document.getElementById("input-phone").value;
  let subject = document.getElementById("input-subject").value;
  let message = document.getElementById("input-message").value;

  if (name == "") {
    return alert("name is required!!!");
  } else if (email == "") {
    return alert("email is required !!!");
  } else if (phone == "") {
    return alert("Phone Number is required !!!");
  } else if (subject == "") {
    return alert("Subject must be selected");
  } else if (message == "") {
    return alert("message is required !!!");
  }

  let emailReceiver = "nczeesh@gmail.com";
  let a = document.createElement("a");
  a.href = `mailto:${emailReceiver}?subject=${subject}&body=Halo, nama saya ${name}, ${message}. Silahkan kontak saya di nomor ${phone}, terimakasih`;
  a.click()

  let dataContact = {
    name,
    email,
    phone,
    subject,
    message,
  }

  console.log(dataContact)
}
