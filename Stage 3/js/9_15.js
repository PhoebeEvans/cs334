

document.getElementById("transactionForm").addEventListener("submit",
function(e){
    let email = document.getElementById("email").value;
    if(email == ""){
        alert("enter an email address");
        e.preventDefault();
    }
    
    if(email.indexOf("@")<1){
        alert("Please enter a valid email address.");
        e.preventDefault();
    }
    
    let card = document.getElementById("card").value;
    if(card == ""){
        alert("please enter your card number");
        e.preventDefault();
    }
    
    const checkMark = document.getElementById("check");
    if (! checkMark.checked) {
    // if here then the checkbox was not selected
        alert("please approve the price");
        e.preventDefault();
    }
    const radios = document.querySelectorAll("input[name=paymentMethod]");
    var radio = 0;
    for (let rad of radios) {
    if (rad.checked) {
    //if here then this ratio button was selected
    console.log(rad.value + " was checked");
    radio = 1;
    }
    }
    if(radio == 0){
        alert("please select payment");
        e.preventDefault();
    }
    
    var d = new Date();
    var id_value = 5;
    var email_value  = String(document.getElementById("email").value);
    var date_value  = d;
    var totalAmount_value  = cost;
    var paymentMethod_value  = String(document.getElementById("paymentMethod").value);
    var paymentStatus_value  = "incomplete";
    var orderItems_value  = orderItems;

    var trans = [
        {id: 4, email: email_value, date: date_value, totalAmount: totalAmount_value, paymentMethod: paymentMethod_value, paymentStatus: paymentStatus_value, orderItems: orderItems_value}
    ];
    localStorage.setItem("action3", JSON.stringify(trans));
    submit();

})