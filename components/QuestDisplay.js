import React from 'react';
import _ from 'lodash';
import {
  TextInput,
  StyleSheet,
  View,
  PanResponder,
  Animated,
} from 'react-native';
import ExText from '~/components/ExText';

const swipeXThreshold = 80;

export default class QuestDisplay extends React.Component {
  state = { name: '' };

  constructor(props) {
    super(props);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return !this.props.isSwiping;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return !(gestureState.dx === 0 && gestureState.dy === 0);
      },

      onPanResponderGrant: (evt, gestureState) => {
        this.setState({ swiping: true });
        this.props.setSwiping(true);
      },
      onPanResponderMove: (evt, gestureState) => {
        this.setState({ swipeX: gestureState.dx });
      },
      onPanResponderTerminationRequest: (evt, gestureState) =>
        !this.props.isSwiping,
      onPanResponderRelease: (evt, gestureState) => {
        this.setState({ swipeX: 0, swiping: false });
        this.props.setSwiping(false);
        if (gestureState.dx > swipeXThreshold) {
          this.toggleQuestCompleted();
        } else if (gestureState.dx < -swipeXThreshold) {
          this.toggleQuestCompleted();
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        this.setState({ swipeX: 0, swiping: false });
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  toggleQuestCollapsed = () => {
    this.props.toggleQuestCollapsed(this.props.questId);
  };

  toggleQuestCompleted = () => {
    this.props.toggleQuestCompleted(this.props.questId);
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

    const { swipeX, swiping } = this.state;

    let swipeColor = 'white';
    if (swipeX > swipeXThreshold) {
      swipeColor = 'rgb(100, 255, 100)';
    }
    if (swipeX < -swipeXThreshold) {
      swipeColor = 'rgb(255, 100, 100)';
    }

    const habitStyle = {
      ...styles.habit,
      left: this.state.swipeX,
    };

    const swiperStyle = {
      backgroundColor: swipeColor,
      // opacity: swiping ? 0.5 : 1,
      marginLeft: depth * 16,
    };

    const displayStyle = quest.completed
      ? { textDecorationLine: 'line-through', textDecorationStyle: 'solid' }
      : {};

    return (
      <View {...this._panResponder.panHandlers} style={swiperStyle}>
        <Animated.View style={habitStyle}>
          <ExText onPress={this.selectQuest} style={displayStyle}>
            {quest.name}
          </ExText>
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
        </Animated.View>
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
