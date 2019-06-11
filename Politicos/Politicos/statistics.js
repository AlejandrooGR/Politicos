
let members = data.results[0].members

let tabla1 = document.getElementById("tabla1");
let tabla2 = document.getElementById("tabla2");
let tabla3 = document.getElementById("tabla3");

let statistics = {
    rep: {
        total: 0,
        avgVotes: 0,
    },

    dem: {
        total: 0,
        avgVotes: 0,
    },

    ind: {
        total: 0,
        avgVotes: 0,
    },

    total: 0,
}


contador();
function contador() {

    members.forEach(function (member) {
        if (member.party == "R") {
            statistics.rep.total++
            statistics.rep.avgVotes += member.votes_with_party_pct
        }
        if (member.party == "D") {
            statistics.dem.total++
            statistics.dem.avgVotes += member.votes_with_party_pct
        }
        if (member.party == "I") {
            statistics.ind.total++
            statistics.ind.avgVotes += member.votes_with_party_pct
        }

        statistics.total++
    });


    let template = "";

    template += `
      <tr>
      <td>Republicans</td>
      <td>${statistics.rep.total}</td>
      <td>${(statistics.rep.avgVotes / statistics.rep.total).toFixed(2)}</td>
      </tr>
      <tr>
      <td>Democrats</td>
      <td>${statistics.dem.total}</td>
      <td>${(statistics.dem.avgVotes / statistics.dem.total).toFixed(2)}</td>
      </tr>
      <tr>
      <td>Independents</td>
      <td>${statistics.ind.total}</td>
      <td>${(statistics.ind.avgVotes / statistics.ind.total).toFixed(2)}</td>
      </tr>
      <tr>
      <td>Total</td>
      <td>${statistics.total}</td>
      <td>${(((statistics.rep.avgVotes / statistics.rep.total) + (statistics.dem.avgVotes / statistics.dem.total) + (statistics.ind.avgVotes / statistics.ind.total)) / 3).toFixed(2)}</td>
      </tr>
`;
    tabla1.innerHTML = template;

}


menorVotos();
function menorVotos() {



    let copyTable = members;
    copyTable.sort(function (a, b) {

        if (a.missed_votes_pct > b.missed_votes_pct) {
            return -1;
        }

        if (a.missed_votes_pct < b.missed_votes_pct) {
            return 1;
        }

        return 0;

    });



    let sliceTable = copyTable.slice(0, copyTable.length * 0.1);
    console.log(sliceTable);

    let template = "";

    for (let i = 0; i < sliceTable.length; i++) {
        let member = sliceTable[i];

        template += `
      <tr>
      <td><a href="${member.url}">${member.first_name}, ${member.middle_name ||
            ""} ${member.last_name}</a></td>
      <td>${member.missed_votes}</td>
      <td>${member.missed_votes_pct}</td>
      </tr>`
    }

    tabla2.innerHTML = template;
}

mayorVotos();
function mayorVotos() {



    let copyTable = members;
    copyTable.sort(function (a, b) {

        if (a.missed_votes_pct < b.missed_votes_pct) {
            return -1;
        }

        if (a.missed_votes_pct > b.missed_votes_pct) {
            return 1;
        }

        return 0;

    });



    let sliceTable = copyTable.slice(0, copyTable.length * 0.1);
    console.log(sliceTable);

    let template = "";

    for (let i = 0; i < sliceTable.length; i++) {
        let member = sliceTable[i];

        template += `
      <tr>
      <td><a href="${member.url}">${member.first_name}, ${member.middle_name ||
            ""} ${member.last_name}</a></td>
      <td>${member.missed_votes}</td>
      <td>${member.missed_votes_pct}</td>
      </tr>`
    }

    tabla3.innerHTML = template;
}

