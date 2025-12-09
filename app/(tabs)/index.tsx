import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { ActivityIndicator, Image, ScrollView, Text, View, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import useFetch from '@/services/usefetch';
import { fetchMovies } from '@/services/api';
import MovieCard from '@/components/MovieCard';

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: '',nith
    })
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: '100%',
          paddingBottom: 10,
        }}>
        <Image source={icons.logo} className="mx-auto mb-5 mt-20 h-10 w-12" />

        {moviesLoading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
        ) : moviesError ? (
          <Text>Error: {moviesError?.message}</Text>
        ) : (
          <View className="mt-5 flex-1">
            <SearchBar onPress={() => router.push('/search')} placeholder="Search for a Movie" />

            <>
              <Text className="mb-3 mt-5 text-lg font-bold text-white">Latest Movie</Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
