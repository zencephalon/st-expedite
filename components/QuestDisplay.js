import React from 'react';
import _ from 'lodash';
import { TextInput, StyleSheet, View } from 'react-native';
import ExText from '~/components/ExText';

export default class QuestDisplay extends React.Component {
  state = { name: '' };

  toggleQuestCollapsed = () => {
    this.props.toggleQuestCollapsed(this.props.questId);
  };

  selectQuest = () => {
    const { questState, questId } = this.props;
    const quest = questState.quests[questId];
    if (questState.selectedQuestId === questId) {
      this.toggleQuestCollapsed();
      return;
    }

    if (quest.collapsed) {
      this.toggleQuestCollapsed();
    }
    this.props.selectQuest(questId);
  };

  addQuest = () => {
    const { addQuest, questId } = this.props;
    const { name } = this.state;

    if (name !== '') {
      addQuest(questId, { name });
      this.setState({ name: '' });
      this.nameInput.focus();
    }
  };

  render() {
    const { questState, parentId, questId, depth } = this.props;
    const quest = questState.quests[questId];
    const { selectedQuestId } = questState;
    const selected = selectedQuestId === questId;

    return (
      <View style={{ marginLeft: depth * 16 }}>
        <ExText onPress={this.selectQuest}>{quest.name}</ExText>
        {!quest.collapsed && (
          <>
            {quest.children &&
              quest.children.map(questId => (
                <QuestDisplay
                  {...this.props}
                  depth={depth + 1}
                  key={questId}
                  toggleQuestCollapsed={this.props.toggleQuestCollapsed}
                  questState={questState}
                  questId={questId}
                  parentId={questId}
                />
              ))}
            {selected && (
              <TextInput
                ref={input => {
                  this.nameInput = input;
                }}
                blurOnSubmit={false}
                onSubmitEditing={this.addQuest}
                style={styles.textInput}
                value={this.state.name}
                onChangeText={name => this.setState({ name })}
              />
            )}
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 30,
    alignSelf: 'stretch',
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 16,
  },
  multiline: {
    fontSize: 20,
    alignSelf: 'stretch',
    borderColor: 'gray',
    borderWidth: 1,
  },
});
