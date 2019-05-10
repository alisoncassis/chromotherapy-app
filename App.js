import React from 'react'
import { StyleSheet, Text, View, Picker, TextInput, Button } from 'react-native'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      therapyFlow: [],
      initFlow: false
    }
    this.addFieldGroup = this.addFieldGroup.bind(this)
    this.fieldGroup = this.fieldGroup.bind(this)
    this.removeIndex = this.removeIndex.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(index, key, value) {
    const { therapyFlow } = this.state
    therapyFlow[index][key] = value
    this.setState({ therapyFlow: [...therapyFlow] })
  }

  addFieldGroup() {
    this.setState({
      therapyFlow: this.state.therapyFlow.concat({ color: '', seconds: '30' })
    })
  }

  removeIndex(index) {
    this.setState({
      therapyFlow: this.state.therapyFlow.filter((object, i) => i !== index)
    })
  }

  fieldGroup(index) {
    const object = this.state.therapyFlow[index]
    return (
      <View style={styles.fieldGroup} key={index}>
        <Picker
          selectedValue={object.color}
          style={{ height: 50, flex: 0.5 }}
          onValueChange={color => this.handleChange(index, 'color', color)}
        >
          <Picker.Item label="Amarelo" value="#FFFF00" />
          <Picker.Item label="Anil" value="#4B0082" />
          <Picker.Item label="Azul" value="#0000FF" />
          <Picker.Item label="Laranja" value="#FFA500" />
          <Picker.Item label="Verde" value="#008000" />
          <Picker.Item label="Vermelho" value="#FF0000" />
          <Picker.Item label="Violeta" value="#EE82EE" />
        </Picker>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            flex: 0.4
          }}
          keyboardType="numeric"
          placeholder="Por quantos segundos?"
          onChangeText={seconds => this.handleChange(index, 'seconds', seconds)}
          value={object.seconds}
        />
        <Button
          style={{
            flex: 0.5
          }}
          onPress={() => this.removeIndex(index)}
          title="X"
          color="red"
        />
      </View>
    )
  }

  render() {
    const { therapyFlow } = this.state
    if (!this.state.initFlow) {
      return (
        <View style={styles.container}>
          <Text>Aqui é onde vc escolhe suas cores e os segundos</Text>
          {this.state.therapyFlow.map((obj, index) => this.fieldGroup(index))}
          <View style={styles.fieldGroup}>
            <Button
              style={{
                flex: 0.5
              }}
              onPress={this.addFieldGroup}
              title="Adicionar"
              color="#841584"
            />
            <Button
              style={{
                flex: 0.5
              }}
              onPress={() => this.setState({ initFlow: true })}
              title="Iniciar"
              color="blue"
            />
          </View>
        </View>
      )
    }
    return <View style={{ flex: 1, backgroundColor: therapyFlow[0].color }} />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fieldGroup: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
