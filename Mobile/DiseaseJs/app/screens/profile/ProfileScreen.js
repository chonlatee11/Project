import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {AuthContex} from '../../components/AutContext/AutContext';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
  DataTable,
} from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
  const {userInfo} = useContext(AuthContex);
  console.log(userInfo);
  return (
    <View>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image
            source={{
              uri: userInfo.avatar,
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}>
              ยินดีต้อนรับ
            </Title>
            <Caption style={styles.caption}>
              {userInfo.fname} {userInfo.lname}
            </Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="map-marker-radius"
            color="#777777"
            size={20}
          />
          <Text style={{color: '#777777', marginLeft: 20}}>Kolkata, India</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="phone" color="#777777" size={20} />
          <Text style={{color: '#777777', marginLeft: 20}}>+91-900000009</Text>
        </View>
      </View>

      <View style={styles.horizonRule} />

      <View>
        <ScrollView>
          <DataTable style={styles.userInfoSection}>
            <DataTable.Row>
              <DataTable.Cell>16 มิถุนายน 2565</DataTable.Cell>
              <DataTable.Cell>โรคใบเหลือง</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  horizonRule: {
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: 30,
    marginRight: 30,
  },
  dataTableStyle: {
    display: 'flex',
    fontSize: 12,
    textAlignments: 'left',
  },
  //dont use this
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});

export default ProfileScreen;
