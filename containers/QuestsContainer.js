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
      ? Quest.addQuest(questState, parent, { name })
      : Quest.addRoot(questState, { name });
    this.setState({ questState: newQuestState });
  };

  render() {
    const { addQuest } = this;
    const questState = this.state.questState || {};

    return this.props.children({
      ...this.props,
      questState,
      addQuest,
    });
  }
}
