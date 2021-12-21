const fetchParties = async () => {

  const fetchPartiesUrl = 'http://localhost:9090/api/parties';

  const div = document.querySelector('.parties-output');
  const ul = document.createElement('ul');
  
  const partiesResponse = await fetch(fetchPartiesUrl, { method: 'GET' });
  const partiesArray = await partiesResponse.json();

  await partiesArray.forEach(party => {
    const li = document.createElement('li');
    li.innerHTML = `${party.partyId} - ${party.partyName}`;
    ul.appendChild(li);
  });

  div.innerHTML = ul.outerHTML;

}

export default () => {
    const content = document.querySelector(".content");
  
    return fetch("./pages/parties/parties.html")
      .then((response) => response.text())
      .then((partiesHtml) => {
        content.innerHTML = partiesHtml;

        fetchParties();

      });
  };