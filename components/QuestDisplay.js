import React from 'react';
import _ from 'lodash';
import ExText from '~/components/ExText';
import { TextInput, StyleSheet, View } from 'react-native';

export default class QuestDisplay extends React.Component {
  state = { name: '' };

  toggleQuestCollapsed = () => {
    this.props.toggleQuestCollapsed(this.props.questId);
  };

  addQuest = () => {
    const { addQuest, questId } = this.props;
    const { name } = this.state;

    addQuest(questId, { name });
    this.setState({ name: '' });
  };

  render() {
    const { questState, parentId, questId, depth } = this.props;
    const quest = questState.quests[questId];

    return (
      <View style={{ marginLeft: depth * 16 }}>
        <ExText onPress={this.toggleQuestCollapsed}>{quest.name}</ExText>
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
            <TextInput
              onSubmitEditing={this.addQuest}
              style={styles.textInput}
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
            />
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
