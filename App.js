import React, { useState } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const addGoalHandler = goalData => {
    if (goalData.length === 0) {
      return;
    }
    setCourseGoals(courseGoals => [
      ...courseGoals,
      { id: Math.random().toString(), value: goalData }
    ]);
    setIsVisible(false);
  };

  const removeGoalItem = goalId => {
    setCourseGoals(courseGoals => {
      return courseGoals.filter(goal => goal.id !== goalId);
    });
  };

  const cancelGoalAdditionalHandler = () => {
    setIsVisible(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsVisible(true)} />
      <GoalInput
        visible={isVisible}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalAdditionalHandler}
      />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem
            title={itemData.item.value}
            onDelete={removeGoalItem.bind(this, itemData.item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});

export default App;
