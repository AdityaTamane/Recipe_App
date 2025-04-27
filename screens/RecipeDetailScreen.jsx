import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity, Linking, Ionicons } from 'react-native';
import React, { useState } from 'react';
import { WebView } from 'react-native-webview';


const RecipeDetailScreen = ({ route, navigation }) => {
  const { recipe } = route.params;

  const [isFavorite, setIsFavorite] = useState(false);

  const getYoutubeEmbedUrl = (url) => {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <>
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
          <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
            <Text style={[styles.favoriteIcon, { color: isFavorite ? '#FF0000' : '#FFFFFF' }]}>
              {isFavorite ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.label}>🥙 Ingredients</Text>
          <Text style={styles.text}>{recipe.ingredients}</Text>

          <Text style={styles.label}>👨‍🍳 Instructions</Text>
          <Text style={styles.text}>{recipe.steps}</Text>

          <Text style={styles.label}>📌 Watch Video</Text>
          <View style={styles.videoContainer}>
            <WebView
              style={styles.video}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{ uri: getYoutubeEmbedUrl(recipe.youtubeLink) }}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(recipe.youtubeLink)}
        >
          <Text style={styles.buttonText}>Watch on YouTube</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3AAFA9',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 260,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  favoriteButton: {
    position: 'absolute',
    top: '10%',
    right: 10,
    padding: 6,
    borderColor:'#000',
    borderWidth:1,
    borderRadius:'50%',
    backgroundColor:'#3AAFA9',
  },
  favoriteIcon: {
    fontSize: 30,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: 0.8,
    alignSelf: 'center',
  },
  label: {
    backgroundColor: '#2B7A78',
    width: 200,
    fontWeight: '700',
    fontSize: 20,
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 20,
    paddingVertical: 6,
    borderRadius: 100,
  },
  text: {
    fontSize: 15,
    color: '#ffffff',
    lineHeight: 22,
    marginBottom: 10,
    paddingLeft: 20,
  },
  videoContainer: {
    marginTop: -10,
    height: 220,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
  button: {
    width: '50%',
    alignSelf: 'center',
    backgroundColor: '#3B82F6',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 2,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
