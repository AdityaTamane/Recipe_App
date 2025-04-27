import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, TextInput, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const categoriesList = ['All', 'Breakfast', 'Meal', 'Dessert'];

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const subscriber = firestore()
      .collection('recipes')
      .onSnapshot(querySnapshot => {
        const recipes = [];

        querySnapshot.forEach(documentSnapshot => {
          recipes.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setRecipes(recipes);
        setFilteredRecipes(recipes);
      });

    return () => subscriber();
  }, []);

  const filterRecipes = () => {
    let filtered = recipes;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(recipe => recipe.catogary === selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredRecipes(filtered);
  };

  useEffect(() => {
    filterRecipes();
  }, [searchQuery, selectedCategory, recipes]);

  useEffect(() => {
    const email = auth().email;
    setEmail(email);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('RecipeDetails', { recipe: item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  // const handleLogout = () => {
  //   auth()
  //     .signOut()
  //     .then(() => {
  //       Alert.alert('User signed out!');
  //       navigation.replace('Initial');
  //     });

  // };
  // const handleLogout = () => {
  //   Alert.alert(
  //     'Logout',
  //     'Are you sure you want to logout?',
  //     [
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Logout',
  //         onPress: () => {
  //           auth()
  //             .signOut()
  //             .then(() => {
  //               navigation.replace('Initial');
  //             })
  //             .catch(error => {
  //               console.error(error);
  //             });
  //         },
  //         style: 'destructive',
  //       },
  //     ],
  //     { cancelable: true }
  //   );
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.welcome}>Let’s cook up! 🍽️</Text>

      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../assets/OIP.jpeg')}
            style={styles.profileImage}
          />
          {/* <Text>Profile</Text> */}
        </TouchableOpacity>
      </View>
    </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          placeholderTextColor='#000'
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}
      >
        {categoriesList.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonSelected,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextSelected,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Recipe List */}
      <FlatList
        data={filteredRecipes}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3AAFA9',
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:20,
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    alignSelf: 'center',
    marginTop:20,
  },
  searchContainer: {
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: '#fff',
    opacity:0.6,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 14,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoriesListContainer: {
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    marginBottom: 20,
  },
  categoryButton: {
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 21,
    marginRight: 10,
    marginBottom:20,
  },
  categoryButtonSelected: {
    backgroundColor: '#4F46E5',
  },
  categoryText: {
    fontSize: 14,
    color: '#374151',
  },
  categoryTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#DEF2F1',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 220,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
  },
  profileImage:{
    // marginTop:10,
    marginRight:'4%',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth:1,
    borderColor:'#fff',
  },
});
