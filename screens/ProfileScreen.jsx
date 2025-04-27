import { View, Text, StyleSheet, TouchableOpacity, Alert,Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            auth()
              .signOut()
              .then(() => {
                navigation.replace('Initial');
              })
              .catch(error => {
                console.error(error);
              });
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };


  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/profilefood.png')} style={styles.topimg} />
      <Text style={styles.title}>✉️ Email:</Text>
      <Text style={styles.email}>{user.email}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3AAFA9',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  email: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 80,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  topimg:{
    resizeMode:'contain',
    height:300,
    width:'150%',
    marginBottom:'10%',
  },
});
