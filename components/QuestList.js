import React from 'react';
import _ from 'lodash';
import ExText from '~/components/ExText';
import { TextInput, StyleSheet } from 'react-native';

export default class QuestsList extends React.Component {
  state = { name: '' };

  addQuest = () => {
    const { addQuest, parentId } = this.props;
    const { name } = this.state;

    addQuest(parentId, { name });
    this.setState({ name: '' });
  };

  render() {
    const { questState, parentId } = this.props;
    console.log('in quest list', this.props.addQuest);
    const quests = parentId
      ? questState.quests[parentId].children
      : questState.rootIds &&
        questState.rootIds.map(id => questState.quests[id]);

    console.log('in questlist', quests, questState);

    return (
      <>
        {quests &&
          questState.rootIds &&
          quests.map(quest => <ExText key={quest.id}>{quest.name}</ExText>)}
        <TextInput
          onSubmitEditing={this.addQuest}
          style={styles.textInput}
          value={this.state.name}
          onChangeText={name => this.setState({ name })}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 30,
    alignSelf: 'stretch',
    borderColor: 'gray',
    borderWidth: 1,
  },
  multiline: {
    fontSize: 20,
    alignSelf: 'stretch',
    borderColor: 'gray',
    borderWidth: 1,
  },
});
