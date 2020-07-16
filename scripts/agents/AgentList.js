import { useAgents, useAgentsMatchingPropertyValue } from './AgentProvider.js';
import { Agent } from './Agent.js';

// event listener for agent name search input element
document
  .querySelector('.agentSearch')
  .addEventListener('keypress', event => {
    //charCode 13 === 'ENTER' key
    if(event.charCode === 13) {
      renderMatchingAgents(event.target.value);
    }
  });

/**
 * Render only those purchasing agents whose names match name parameter to article.agents--found DOM node.
 * @param {String} name The name of the agent to search on
 * @param {String} property The property to match the search query on. Default value is fullName. Can pass in 'firstName' instead to search by firstName only, for example.
 */
const renderMatchingAgents = (name, property = 'fullName') => {
  const domNode = document.querySelector('.agents--found');

  const matchingAgents = useAgentsMatchingPropertyValue(property, name);

  const matchingAgentsHTML = matchingAgents.map(Agent).join('\n');

  domNode.innerHTML = `
    <h2 class="list__heading">Matching Agents</h2>
    ${matchingAgentsHTML}
  `;
};

/**
 * Render all agents to the article.agents--all DOM node.
 */
export const AgentList = () => {
  const domNode = document.querySelector('.agents--all');

  const agents = useAgents();

  const agentsHTML = agents.map(Agent).join('\n');

  domNode.innerHTML += `
    <h2 class="list__heading">Purchasing Agents</h2>
    ${agentsHTML}
  `;
};