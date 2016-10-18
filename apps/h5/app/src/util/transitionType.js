const SHOW_FROM_LEFT = 'sfl';
const SHOW_FROM_RIGHT = 'sfr';
const REVEAL_FROM_LEFT = 'rfl';
const REVEAL_FROM_RIGHT = 'rfr';

let transitionType = SHOW_FROM_RIGHT;

const setTransitionType = (transition) => {
  transitionType = transition;
};

const getTransitionType = () => (transitionType);

export {
  SHOW_FROM_LEFT, SHOW_FROM_RIGHT,
  REVEAL_FROM_LEFT, REVEAL_FROM_RIGHT,
  setTransitionType, getTransitionType,
}
