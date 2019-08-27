import nanoid from 'nanoid/non-secure';
import { load, save } from './storage';

const QUESTS = 'QUESTS';
// empty = {
//   rootIds: [],
//   quests: {},
//   selected: null,
//   archived: [],
// };
const empty = {
  rootIds: ['a', 'b'],
  quests: {
    a: {
      id: 'a',
      name: 'Build St. Expedite',
      children: [],
      collapsed: false,
      completed: false,
    },
    b: {
      id: 'b',
      name: 'Build Zwiki',
      children: [],
      collapsed: false,
      completed: false,
    },
  },
  selectedQuestId: null,
  archivedQuests: [],
};

const emptyQuest = {
  id: '',
  name: '',
  children: [],
  collapsed: false,
  completed: false,
};

export const loadQuests = () => load(QUESTS, empty);
export const saveQuests = quests => save(QUESTS, quests);

export const selectQuest = (questState, questId) => {
  return {
    ...questState,
    selectedQuestId: questId,
  };
};

const makeQuest = ({ name }) => ({
  ...emptyQuest,
  name,
  id: nanoid(),
});

export const addRoot = (state, { name }) => {
  const quest = makeQuest({ name });

  return {
    ...state,
    quests: { ...state.quests, [quest.id]: quest },
    rootIds: [...state.rootIds, quest.id],
  };
};

export const addQuest = (state, parentId, { name }) => {
  const quest = makeQuest({ name });
  const parent = state.quests[parentId];

  if (!parent) {
    throw Error(`No parent with parentId: '${parentId}' found`);
  }

  return {
    ...state,
    quests: {
      ...state.quests,
      [quest.id]: quest,
      [parent.id]: {
        ...parent,
        children: [...parent.children, quest.id],
      },
    },
  };
};

export const updateQuest = (state, updatedQuest) => ({
  ...state,
  quests: {
    ...state.quests,
    [updatedQuest.id]: updatedQuest,
  },
});

export const toggleQuestCompleted = quest => ({
  ...quest,
  completed: !quest.completed,
});

export const toggleQuestCollapsed = quest => ({
  ...quest,
  collapsed: !quest.collapsed,
});
