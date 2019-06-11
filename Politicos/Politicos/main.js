

// let table = document.getElementById("senate-data");

// function busqueda() {

// }
// for (let i = 0; i < data.results[0].members.length; i++) {

//     var tr = document.createElement("tr");
//     var td = document.createElement("td");
//     var td1 = document.createElement("td");
//     var td2 = document.createElement("td");
//     var td3 = document.createElement("td");
//     var td4 = document.createElement("td");



//     var lastname = document.createTextNode(data.results[0].members[i].last_name);
//     var firstname = document.createTextNode(data.results[0].members[i].first_name);
//     var middlename = document.createTextNode(data.results[0].members[i].middle_name);
//     var party = document.createTextNode(data.results[0].members[i].party);
//     var state = document.createTextNode(data.results[0].members[i].state);
//     var seniority = document.createTextNode(data.results[0].members[i].seniority);
//     var votes = document.createTextNode(data.results[0].members[i].votes_with_party_pct);




//     var espacio = document.createTextNode(" ");
//     var espacio1 = document.createTextNode(" ");


//     tr.appendChild(td);
//     tr.appendChild(td1);
//     tr.appendChild(td2);
//     tr.appendChild(td3);
//     tr.appendChild(td4);



//     td.appendChild(lastname);
//     td.appendChild(espacio);
//     td.appendChild(middlename);
//     td.appendChild(espacio1);
//     td.appendChild(firstname);
//     td1.appendChild(party);
//     td2.appendChild(state);
//     td3.appendChild(seniority);
//     td4.appendChild(votes);





//     table.appendChild(tr);

// }





// for (let i = 0; i < members.length; i++) {
//   //Creo una puta fila en el puto limbo
//   let row = document.createElement("tr");

//   let fullName =
//     members[i].first_name +
//     " " +
//     (members[i].middle_name || "") +
//     ", " +
//     members[i].last_name;

//   row.insertCell().innerHTML = fullName;
//   row.insertCell().innerHTML = members[i].party;
//   row.insertCell().innerHTML = members[i].state;

//   //Cuelga la puta row en la puta table
//   miTabla.append(row);
// }

//////////////////////////////////////////////////////////////////////////////////////////

let members = data.results[0].members;

let miTabla = document.getElementById("senate-data");
let selector = document.getElementById("state-filter");

document.getElementById("rep").addEventListener("change", sayHello);
document.getElementById("dem").addEventListener("change", sayHello);
document.getElementById("ind").addEventListener("change", sayHello);
document.getElementById("state-filter").addEventListener("change", sayHello);


function prinTable() {
  let template = "";
  for (let i = 0; i < members.length; i++) {
    let member = members[i];
    template += `
    <tr>
      <td><a href="${member.url}">${member.first_name}, ${member.middle_name ||
      ""} ${member.last_name}</a></td>
      <td>${member.party}</td>
      <td>${member.state}</td>
      <td>${member.seniority}</td>
      <td>${member.votes_with_party_pct}</td>

    </tr>`;
  }
  miTabla.innerHTML = template;
}

prinTable();


sayHello();
function sayHello() {
  let repCb = document.getElementById("rep");
  let demCb = document.getElementById("dem");
  let indCb = document.getElementById("ind");
  let checkeados = [];

  let estado = document.getElementById("state-filter").value;
  for (let i = 0; i < members.length; i++) {

    let options = document.createElement("option");
    options.innerHTML = members[i].state;
    selector.append(options)

  }

  if (repCb.checked) {
    checkeados.push("R");
  }

  if (demCb.checked) {
    checkeados.push("D");
  }

  if (indCb.checked) {
    checkeados.push("I");
  }

  // if (!repCb.checked && !demCb.checked && !indCb.checked) {
  if (checkeados.length == 0) {
    checkeados.push("R");
    checkeados.push("D");
    checkeados.push("I");
  }

  let membersToPrint = [];




  members.forEach(function (member) {
    if (checkeados.includes(member.party)) {
      if (estado !== "ALL") {
        if (member.state == estado) {
          membersToPrint.push(member);
        }
      } else {
        membersToPrint.push(member);
      }
    }
  });





  console.log(membersToPrint);

  printNewTable(membersToPrint);
}

//Function that prints the new members
function printNewTable(miembrosAImprimir) {
  let template = "";

  miembrosAImprimir.forEach(function (member) {
    template += `
    <tr>
      <td><a href="${member.url}">${member.first_name}, ${member.middle_name ||
      ""} ${member.last_name}</a></td>
      <td>${member.party}</td>
      <td>${member.state}</td>
      <td>${member.seniority}</td>
      <td>${member.votes_with_party_pct}</td>

    </tr>`;
  })

  miTabla.innerHTML = template;
}
