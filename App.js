import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Button,
  ScrollView
} from 'react-native'
import * as Speech from 'expo-speech'

//components
import Task from './Components/Task'

export default function App() {
  const [task, setTask] = useState()
  const [taskItems, setTaskItems] = useState([])

  const handleAddTask = () => {
    Keyboard.dismiss()
    setTaskItems([...taskItems, task])
    setTask(null)
  }

  const completeTask = index => {
    let itemsCopy = [...taskItems]
    itemsCopy.splice(index, 1)
    setTaskItems(itemsCopy)
  }

  const speak = () => {
    const thingToSay = ` Flex vs grid 
Grid is made for two-dimensional 
layout while Flexbox is for one. 
This means Flexbox can work on either row or columns at a time,
 but Grids can work on both. Flexbox,
  gives you more flexibility while working on either element (row or column).
   HTML markup and CSS will be easy to manage in this type of scenario.
`
    Speech.speak(thingToSay)

    setTimeout(() => {
      Speech.stop(thingToSay)
    }, 100)
    // Speech.stop(thingToSay)
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}> To Learn</Text>

          <View style={styles.items}>
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeTask(index)}
                >
                  <Task text={item} />
                </TouchableOpacity>
              )
            })}
            {/* <Task text='Task 1' />
          <Task text='Task 2 ' /> */}
          </View>

          <Button title='Press to hear some words' onPress={speak} />
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={(Platform.OS === 'android') | 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <StatusBar style='dark' backgroundColor='#fc4c5d' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fc4c5d'
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#000',
    borderWidth: 1,
    width: 250
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1
  },
  addText: {}
})
