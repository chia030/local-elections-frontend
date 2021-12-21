const handleCandidateChange = (e) => {

  const selectParty = document.querySelector('.party-selector');
  e.target.value ? (selectParty.options[0].selected = true, selectParty.disabled = true) : selectParty.disabled = false ;

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

const handleActionChange = (e) => {
  displayActionBody(e.target.value);
}

const handleAddCandidate = async (e) => {

  e.preventDefault();

  const candidateName = document.querySelector('.candidate-name').value;
  const candidateParty = document.querySelector('.candidate-party-selector').value;
  const success = document.querySelector('.success');

  const addCandidateUrl = `http://localhost:9090/api/candidates?fullName=${candidateName}&partyId=${candidateParty}`

  const addedResponse = await fetch(addCandidateUrl, { method: 'POST' });
  success.innerHTML = addedResponse.status===200 ? 'Success!' : 'Something went wrong :(';

}
const handleEditCandidate = async (e) => {

  e.preventDefault();

  const ogCandidate = document.querySelector('.candidate-candidate-selector').value;
  const candidateName = document.querySelector('.candidate-name').value;
  const candidateParty = document.querySelector('.candidate-party-selector').value;
  const success = document.querySelector('.success');

  const editCandidateUrl = `http://localhost:9090/api/candidates/${ogCandidate}?fullName=${candidateName}&partyId=${candidateParty}`;

  const editedResponse = await fetch(editCandidateUrl, { method: 'PUT' });
  success.innerHTML = editedResponse.status===200 ? 'Success!' : 'Something went wrong :(';

}
const handleDeleteCandidate = async (e) => {

  e.preventDefault();

  const candidate = document.querySelector('.candidate-candidate-selector').value;
  const success = document.querySelector('.success');

  const deleteCandidateUrl = `http://localhost:9090/api/candidates/${candidate}`;

  const deletedResponse = await fetch(deleteCandidateUrl, { method: 'DELETE' });
  success.innerHTML = deletedResponse.status===200 ? 'Success!' : 'Something went wrong :(';

}

const displayActionBody = (param) => {

  const actionBody = document.querySelector('.candidates-action-body');

  switch(param) {
    case 'add':
      fetch("./pages/main/actions/add-candidate.html")
        .then((response) => response.text())
        .then((addHtml) => {
          actionBody.innerHTML = addHtml;

          const selectCandidateParty = document.querySelector('.candidate-party-selector');
          fetchPartyOptions(selectCandidateParty);

          const addForm = document.querySelector('.add-candidate-form');
          addForm.addEventListener('submit', handleAddCandidate);
        });

      break;
    case 'edit':
      fetch("./pages/main/actions/edit-candidate.html")
        .then((response) => response.text())
        .then((editHtml) => {
          actionBody.innerHTML = editHtml;

          const selectCandidate = document.querySelector('.candidate-candidate-selector');
          fetchCandidateOptions(selectCandidate);
          const selectCandidateParty = document.querySelector('.candidate-party-selector');
          fetchPartyOptions(selectCandidateParty);

          const editForm = document.querySelector('.edit-candidate-form');
          editForm.addEventListener('submit', handleEditCandidate);

        });
      break;
    case 'delete':
      fetch("./pages/main/actions/delete-candidate.html")
        .then((response) => response.text())
        .then((deleteHtml) => {
          actionBody.innerHTML = deleteHtml;

          const selectCandidate = document.querySelector('.candidate-candidate-selector');
          fetchCandidateOptions(selectCandidate);

          const deleteForm = document.querySelector('.delete-candidate-form');
          deleteForm.addEventListener('submit', handleDeleteCandidate);

        });
      break;
  }

}

const handleVote = async (e) => {

  e.preventDefault();

  const candidate = document.querySelector('.candidate-selector').value;
  const party = document.querySelector('.party-selector').value;
  const success = document.querySelector('.vote-success');

  const addCandidateVoteUrl = `http://localhost:9090/api/votes?candidateId=${candidate}`;
  const addPartyVoteUrl = `http://localhost:9090/api/votes?partyId=${party}`;

  const url = candidate ? addCandidateVoteUrl : addPartyVoteUrl;

  const editedResponse = await fetch(url, { method: 'POST' });
  success.innerHTML = editedResponse.status===200 ? 'Success!' : 'Something went wrong :(';

}

export default () => {
    const content = document.querySelector(".content");
  
    return fetch("./pages/main/main.html")
      .then((response) => response.text())
      .then((mainHtml) => {
        content.innerHTML = mainHtml;

        const actionSelector = document.querySelector(".action-selector");
        actionSelector.addEventListener('change', handleActionChange);
        displayActionBody(actionSelector.value);

        const selectVoteParty = document.querySelector('.party-selector');
        fetchPartyOptions(selectVoteParty);

        const selectCandidate = document.querySelector('.candidate-selector');
        fetchCandidateOptions(selectCandidate);
        selectCandidate.addEventListener('change', handleCandidateChange);

        const addVote = document.querySelector('.add-vote-form');
        addVote.addEventListener('submit', handleVote);

      });
  };