const fetchPartyOptions = async () => {

  const fetchPartiesUrl = 'http://localhost:9090/api/parties';

  const partiesResponse = await fetch(fetchPartiesUrl, { method: 'GET' });
  const partiesArray = await partiesResponse.json();

  const selectParty = document.querySelector('#party-selector');

  await partiesArray.forEach(party => {
    const option = document.createElement('option');
    option.value = party.id;
    option.innerHTML = `${party.partyId} - ${party.partyName}`;
    selectParty.appendChild(option);
  })

}

const fetchCandidates = async (e) => {

  const partyId = e ?  e.target.value : 0;

  const url = `http://localhost:9090/api/candidates?partyId=${partyId}`;

  const div = document.querySelector('.candidates-output');
  const ul = document.createElement('ul');

  const candidatesResponse = await fetch(url, { method: 'GET' });
  const candidatesArray = await candidatesResponse.json();

  await candidatesArray.forEach(candidate => {
    const li = document.createElement('li');
    li.innerHTML = candidate.fullName;
    ul.appendChild(li);
  });

  div.innerHTML = ul.outerHTML;

}

export default () => {
    const content = document.querySelector(".content");
  
    return fetch("./pages/candidates/candidates.html")
      .then((response) => response.text())
      .then((candidatesHtml) => {
        content.innerHTML = candidatesHtml; 

        const selectParty = document.querySelector('#party-selector');
        selectParty.addEventListener("change", fetchCandidates);

        fetchPartyOptions();
        fetchCandidates();

      });
  };