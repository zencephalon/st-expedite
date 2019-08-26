import { load, save } from './storage';
import nanoid from 'nanoid/non-secure';

QUESTS = 'QUESTS';
empty = {
  roots: [],
  quests: {},
};

emptyQuest = {
  id: '',
  name: '',
  children: [],
  collapsed: false,
  completed: false,
}

export const loadQuests = () => load(QUESTS, empty);
export const saveQuests = (quests) => save(QUESTS, quests);

makeQuest = ({ name }) => (
  {
    ...emptyQuest,
    name,
    id: nanoid(),
  }
)

addRoot = (state, { name }) => {
  quest = makeQuest({ name });

  return {
    ...state,
    quests: { ...state.quests, [quest.id]: quest },
    roots: [...state.roots, quest.id],
  }
}

updateQuest = (state, updatedQuest) => (
  {
    ...state,
    quests: {
      ...state.quests,
      [updatedQuest.id]: updatedQuest,
    }
  }
)

addQuest = (state, parentId, { name }) => {
  quest = makeQuest({ name });
  parent = state.quests[parentId];

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
  }
}

toggleQuestCompleted = (quest) => (
  {
    ...quest,
    completed: !quest.completed,
  }
)

toggleQuestCollapsed = (quest) => (
  {
    ...quest,
    collapsed: !quest.collapsed,
  }
)