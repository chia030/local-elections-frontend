import renderMain from "./pages/main/main.js";
import renderCandidates from "./pages/candidates/candidates.js";
import renderParties from "./pages/parties/parties.js";
import renderVotes from "./pages/votes/votes.js";

export default function () {

  window.router = new Navigo("/", {hash: true});

  router
    .on({ 
      "/": () => {
      renderMain().then(router.updatePageLinks);
    },
    candidates: () => {
      renderCandidates();
    },
    parties: () => {
      renderParties();
    },
    votes:() => {
      renderVotes();
    }
  })
    .resolve();
}