import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import db from '../Config'
import firebase from 'firebase'

export default class DressDetails extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          info: this.props.navigation.getParam("Data"),
          docId: ''
      }
  }
  getDocId = async () => {
    var docId = ""
      await db.collection("Outfits").where("image_id","==",this.state.info.image_id).get().then(doc => {
          doc.docs.map(data => {
            docId = data.id
          })
          this.setState({
              docId: docId
          })
      })
  }
  woreOutfit = async () => {
      db.collection("Outfits").doc(this.state.docId).update({
          date: firebase.firestore.FieldValue.serverTimestamp()
      })
      alert("Database was succesfully updated!")
  }
  rent = () => {
      db.collection("Outfits").doc(this.state.docId).update({
          forRent: true
      })
  }
  sold = () => {
      db.collection("Outfits").doc(this.state.docId).delete()
  }
  componentDidMount() {
      this.getDocId()
  }
    render() {
        return (
        <View style={styles.container}>
            <Image 
                source={{uri: this.state.info.image_uri}}
                style={styles.image}
            />
            <Text>Type: {this.state.info.type}</Text>
            <TouchableOpacity onPress={() => {
                this.woreOutfit()
            }}>
                <Text>Wore</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                this.rent()
            }}>
                <Text>Rent It</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                this.sold()
            }}>
                <Text>Don't Have It</Text>
            </TouchableOpacity>
        </View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
      width: 400,
      height: 400, 
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
  }
});
