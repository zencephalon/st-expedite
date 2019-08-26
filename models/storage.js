import { AsyncStorage } from 'react-native';

export const load = async (modelName, empty) => {
  console.log('load', modelName);
  try {
    const value = await AsyncStorage.getItem(modelName);
    let models = JSON.parse(value) || empty;
    return models;
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
};

export const save = async (modelName, models) => {
  try {
    await AsyncStorage.setItem(modelName, JSON.stringify(models));
  } catch (error) {
    // Error saving data
  }
}