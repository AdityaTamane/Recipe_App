import { Animated, Image, Pressable, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useNavigation } from '@react-navigation/native';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const InitialScreen = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  const openModal = () => {
    setVisible(true);
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => {
      setVisible(false);
    });
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/Foodies_logo.png')} style={styles.logo} resizeMode="contain" />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.smallText}>Hey,</Text>
          <Text style={styles.smallText}>Welcome to</Text>
          <Text style={styles.bigText}>FOODIES GOODIES 🍴</Text>
        </View>

        <TouchableOpacity 
          style={styles.startButton} 
          onPress={() => {
            openModal();
            ReactNativeHapticFeedback.trigger('impactLight', options);
          }}
        >
          <Text style={styles.startButtonText}>LET'S GET STARTED ➡️</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <Modal
        animationType='none'
        transparent
        visible={visible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleAnim }], opacity: opacityAnim }]}>
            <Text style={styles.modalTitle}>Welcome to Foodies Goodies! 🍔</Text>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity 
                style={styles.modalButton} 
                onPress={() => { navigation.navigate('Login'); closeModal(); }}
              >
                <Text style={styles.modalButtonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.modalButton} 
                onPress={() => { navigation.navigate('SignUp'); closeModal(); }}
              >
                <Text style={styles.modalButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            <Pressable onPress={closeModal} style={styles.notToday}>
              <Text style={styles.notTodayText}>Maybe Later</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

export default InitialScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#10B981',
  },
  logoContainer: {
    marginTop: '8%',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: 300,
  },
  textContainer: {
    marginTop: '15%',
    alignItems: 'center',
  },
  smallText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '600',
  },
  bigText: {
    fontSize: 32,
    color: '#F5F5DC',
    fontWeight: 'bold',
    marginTop: 10,
  },
  startButton: {
    marginTop: '15%',
    backgroundColor: '#F5F5DC',
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 15,
    borderRadius: 30,
    shadowColor: '#16a085',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  startButtonText: {
    fontSize: 20,
    color: 'green',
    textAlign: 'center',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#1abc9c',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  modalButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  notToday: {
    marginTop: 30,
  },
  notTodayText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: '500',
  },
});
