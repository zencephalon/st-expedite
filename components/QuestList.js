import React from 'react';
import _ from 'lodash';
import { TextInput, StyleSheet } from 'react-native';

import QuestDisplay from '~/components/QuestDisplay';

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
    const questIds = parentId
      ? questState.quests[parentId].children
      : questState.rootIds;

    return (
      <>
        {questIds &&
          questIds.map(questId => (
            <QuestDisplay
              {...this.props}
              depth={0}
              key={questId}
              questState={questState}
              questId={questId}
              parentId={parentId}
            />
          ))}
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
