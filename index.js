
const retrievedata = () =>{
    let entries = localStorage.getItem('user_details');
    if(entries) entries = JSON.parse(entries);
    else entries = [];
    return entries;
};
const display = () =>{
    const entries = retrievedata();
    if(entries.length==0) return;
    const tabledata = entries.map((entry)=>{
        let name = `<td  class="border rounded-lg text-center">${entry.name}</td>`;
        let email = `<td class="border rounded-lg text-center"> ${entry.email}</td>`;
        let password = `<td class="border rounded-lg text-center"> ${entry.password}</td>`;
        let dob = `<td class="border rounded-lg text-center"> ${entry.dob}</td>`;
        let check = `<td class="border rounded-lg text-center"> ${entry.check}</td>`;
        let row = `<tr class="border rounded-lg text-center">${name} ${email} ${password} ${dob} ${check}</tr>`;
        return row;
    }).join("\n");
    const table = `
    <h1 class=" font-bold">User Details</h1>
    <table class="border w-full">
      <tr class="border rounded-lg text-center">
         <th class="border rounded-lg text-center">Name</th>
         <th class="border rounded-lg text-center">Email</th>
         <th class="border rounded-lg text-center">Password</th>
         <th class="border rounded-lg text-center">Dob</th>
         <th class="border rounded-lg text-center">Accepted terms?</th>
      </tr>
       ${tabledata}
    <table>     
    `;
    let display_info =  document.getElementById("show_data");
    display_info.innerHTML = table;
};
let userdetails = retrievedata();
let form = document.getElementById('userform');
form.addEventListener('submit', () => {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let check = document.getElementById("check").checked;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const today = new Date();
    const dob_date = new Date(dob);
    let age = today.getFullYear() - dob_date.getFullYear();
    let month_diff = today.getMonth() - dob_date.getMonth();
    if (month_diff < 0 || (month_diff == 0 && today.getDate() < dob_date.getDate())) age--;

    if (!emailRegex.test(email)) {
        return; 
    }
    if (age < 18 || age > 55) {
        return;
    }

    if (name && email && password && dob && check) {
        const details = { name, email, password, dob, check };
        let userdetails = JSON.parse(localStorage.getItem("user_details")) || [];
        userdetails.push(details);
        localStorage.setItem("user_details", JSON.stringify(userdetails));
        display();  
    }
});
display();
