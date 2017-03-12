import React, { Component, PropTypes } from 'react';
import { View, Dimensions, ScrollView, TouchableWithoutFeedback, RefreshControl, ListView, StyleSheet, Text, StatusBar } from 'react-native';
import { autobind } from 'core-decorators';

const styles = StyleSheet.create({
  navigationHeader: {
    height: 75,
    paddingTop: 25,
    backgroundColor: 'yellow',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  listItem: {
    flexGrow: 1,
    width: Dimensions.get('window').width,
    padding: 20, 
    backgroundColor: 'red'
  }
});

let listData = [];
for (let i=0; i<100; i++) {
  listData.push({
    id: i,
    name: `List Item ${i}`
  });
}

@autobind
export default class TestScreen extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  static defaultProps = {};

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds: ds.cloneWithRows(listData),
      refreshing: false
    };
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          translucent={true}
          animated={true}
          barStyle='dark-content'
        />
        <View style={styles.navigationHeader}>
          <View key='leftElements' />
          <View key='title'><Text>Hello World</Text></View>
          <View key='rightElements' />
        </View>
        <ListView
          dataSource={this.state.ds}
          renderRow={rowData => (
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableWithoutFeedback onPress={() => alert('Hello')}>
                <View style={styles.listItem}>
                  <Text>{rowData.name}</Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.listItem}>
                <Text>This is the swiped one</Text>
              </View>
            </ScrollView>
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({refreshing: true}, () => {
                  setTimeout(() => {
                    this.setState({refreshing: false})
                  }, 4000)
                })
              }}
            />
          }
        />
      </View>
    );
  }
}
