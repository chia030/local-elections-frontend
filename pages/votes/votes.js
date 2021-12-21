const handleCandidateChange = (e) => {
  const partySel = document.querySelector('.party-selector');
  const total = document.querySelector('.total-party');
  e.target.value ? (partySel.options[0].selected = true, partySel.disabled = true, total.disabled = true) : (partySel.disabled = false, total.disabled = false);
}

const handlePartyChange = (e) => {
  const candidateSel = document.querySelector('.candidate-selector');
  e.target.value ? (candidateSel.options[0].selected = true, candidateSel.disabled = true) : (candidateSel.disabled = false);
}

const handleForm = async (e) => {
  
  e.preventDefault();

  const candidate = document.querySelector('.candidate-selector').value;
  const party = document.querySelector('.party-selector').value;
  const total = document.querySelector('.total-party').checked;

  console.log(candidate);
  console.log(party);
  console.log(total);

  let url;
  
  if (candidate !== "") {
    url = `http://localhost:9090/api/votes?candidateId=${candidate}`;
  }
  else if (party !== "") {
    url = `http://localhost:9090/api/votes?partyId=${party}&totalPartyVotes=${total}`;
  }
  else {
    url = 'http://localhost:9090/api/votes';
  }

  fetchVotes(url);

}

const fetchCandidateOptions = async (select) => {

  const fetchCandidatesUrl = `http://localhost:9090/api/candidates`;

  const candidatesResponse = await fetch(fetchCandidatesUrl, { method: 'GET' });
  const candidatesArray = await candidatesResponse.json();

  const selectCandidate = document.querySelector('.candidate-selector');

  await candidatesArray.forEach(candidate => {
    const option = document.createElement('option');
    option.value = candidate.candidateId;
    option.innerHTML = `${candidate.party.partyId} - ${candidate.fullName}`;
    select.appendChild(option);
  });

}

const fetchPartyOptions = async (select) => {

  const fetchPartiesUrl = 'http://localhost:9090/api/parties';

  const partiesResponse = await fetch(fetchPartiesUrl, { method: 'GET' });
  const partiesArray = await partiesResponse.json();

  await partiesArray.forEach(party => {
    const option = document.createElement('option');
    option.value = party.id;
    option.innerHTML = `${party.partyId} - ${party.partyName}`;
    select.appendChild(option);
  });

}

const fetchVotes = async (url) => {

  const div = document.querySelector('.votes-output');
  const ul = document.createElement('ul');
  
  const votesResponse = await fetch(url, { method: 'GET' });
  const votesArray = await votesResponse.json();
  
  let cnt = 0;

  await votesArray.forEach(vote => {
    const li = document.createElement('li');
    cnt++;
    const voteBody = vote.votedParty ?
                    `${vote.votedParty.partyId} - ${vote.votedParty.partyName}`
                    :
                    `${vote.votedCandidate.party.partyId} - ${vote.votedCandidate.fullName}`;
    li.innerHTML = `${cnt} => ${voteBody}`;
    ul.appendChild(li);
  });

  div.innerHTML = ul.outerHTML;

}

export default () => {
    const content = document.querySelector(".content");
  
    return fetch("./pages/votes/votes.html")
      .then((response) => response.text())
      .then((votesHtml) => {
        content.innerHTML = votesHtml;

        const selectCandidate = document.querySelector('.candidate-selector');
        fetchCandidateOptions(selectCandidate);
        selectCandidate.addEventListener('change', handleCandidateChange);

        const selectVoteParty = document.querySelector('.party-selector');
        fetchPartyOptions(selectVoteParty);
        selectVoteParty.addEventListener('change', handlePartyChange)

        fetchVotes('http://localhost:9090/api/votes');

        const votesForm = document.querySelector('.votes-form');
        votesForm.addEventListener('submit', handleForm);

      });
  };