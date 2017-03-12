import React, { Component, PropTypes } from 'react';
import { ListView, View, ScrollView, Dimensions, TouchableWithoutFeedback, RefreshControl, StyleSheet, Text, StatusBar } from 'react-native';
import { autobind } from 'core-decorators';
import { LIST } from 'app/routes';

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
    backgroundColor: 'orange'
  }
});

let listData = [];
for (let i=0; i<100; i++) {
  listData.push({
    id: i,
    name: `Your List #${i}`
  });
}

@autobind
export default class TestScreen extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds: ds.cloneWithRows(listData),
      refreshing: false
    };
  }

  render () {
    console.log('this.props.router.push', this.props.router.push, LIST)
    return (
      <ListView
        dataSource={this.state.ds}
        renderRow={rowData => (
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
          >
            <TouchableWithoutFeedback onPress={() => this.props.router.push(LIST)}>
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
    );
  }
}
