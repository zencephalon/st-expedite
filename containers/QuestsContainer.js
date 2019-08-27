import React from 'react';
import _ from 'lodash';
import * as Quest from '~/models/quests';

export default class QuestsContainer extends React.Component {
  state = { questState: null };

  componentDidMount() {
    this.loadQuests();
  }

  loadQuests = async () => {
    // await Habit.resetData();
    const questState = await Quest.loadQuests();
    // const habits = data_import;
    console.log('out here', JSON.stringify(questState));
    this.setState({ questState });
  };

  addQuest = (parentId, { name }) => {
    const { questState } = this.state;
    newQuestState = parentId
      ? Quest.addQuest(questState, parentId, { name })
      : Quest.addRoot(questState, { name });
    this.setState({ questState: newQuestState });
  };

  toggleQuestCollapsed = questId => {
    const { questState } = this.state;
    const quest = questState.quests[questId];

    console.log('in toggle quest', quest, questId);

    newQuestState = Quest.updateQuest(
      questState,
      Quest.toggleQuestCollapsed(quest)
    );
    this.setState({ questState: newQuestState });
  };

  render() {
    const { addQuest, toggleQuestCollapsed } = this;
    const questState = this.state.questState || {};

    return this.props.children({
      ...this.props,
      questState,
      addQuest,
      toggleQuestCollapsed,
    });
  }
}
