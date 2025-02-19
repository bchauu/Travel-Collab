import React, {useState, useEffect} from 'react';
import {
  View,
  Modal,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Paragraph} from 'react-native-paper';
import useApiConfig from '../../utils/apiConfig';
import {Card} from 'react-native-paper';
import ListSelector from './BottomSheet';
import {useTheme} from '../../context/ThemeContext';
import {useTravelList} from '../../context/AllTravelListContext';
import PlaceDetails from './PlaceDetails';
import axios from 'axios';

const DirectSearchPlace = ({directSearchResult, submitGoogleUrl}) => {
  const {token, apiUrl} = useApiConfig();
  const {theme} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [isBottomVisible, setIsBottomVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  // const [allTravelList, setAllTravelList] = useState([]);
  const {allTravelList, setAllTravelList} = useTravelList();
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    if (token && apiUrl) {
      try {
        const getList = async () => {
          const response = await axios.get(`${apiUrl}/trips/lists/places`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          setAllTravelList([...response.data.travelLists]);
        };
        getList();
      } catch (error) {
        console.error('Error fetching travel lists:', error.message);
        if (error.response) {
          console.error('Response error:', error.response);
        } else if (error.request) {
          console.error('Request error:', error.request);
        } else {
          console.error('Other error:', error);
        }
      }
    }
  }, [token, apiUrl]);

  const handleGoogleUrl = () => {
    submitGoogleUrl();
    setModalVisible(true);
  };

  useEffect(() => {
    console.log(directSearchResult[0]);
  }, [directSearchResult]);

  const handleAddDirectToList = item => {
    setSelectedItem(item);
    setIsBottomVisible(true);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => handleGoogleUrl()}
        style={{
          ...theme.buttons.cta,
          ...styles.buttonContainer,
          backgroundColor: theme.colors.secondary,
        }}>
        <Text style={[theme.buttons.ctaText]}>Find Location</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true} // Set to true to allow background visibility
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // To allow closing the modal
      >
        <View style={styles.modalBackground}>
          <View style={styles.container}>
            <Text>Is this the One?</Text>

            {isBottomVisible && (
              <ListSelector
                allTravelList={allTravelList}
                selectedItem={selectedItem}
                isBottomVisible={isBottomVisible}
                setIsBottomVisible={setIsBottomVisible}
              />
            )}
            {directSearchResult && (
              <ScrollView horizontal>
                <Card style={(styles.container, theme.lists.card)}>
                  {directSearchResult.map(item => (
                    <View key={item.place_id}>
                      <Card.Content
                        style={{
                          ...theme.lists.cardContainer,
                          flexDirection: 'column',
                        }}>
                        <Text style={[theme.lists.cardTitle]}>{item.name}</Text>
                        <Image
                          source={{uri: `${item.photos[0]?.photoUrl}`}}
                          style={theme.lists.cardImage}
                        />
                        <View
                          style={[{flexDirection: 'column', maxWidth: 300}]}>
                          <Paragraph style={[{...theme.lists.cardDetails}]}>
                            Address: {item.address}
                          </Paragraph>
                          <Paragraph style={[{...theme.lists.cardDetails}]}>
                            Rating: {item.rating}
                          </Paragraph>
                          <Paragraph style={[{...theme.lists.cardDetails}]}>
                            Total: {item.userRatingTotal}
                          </Paragraph>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <PlaceDetails
                            placeId={item.placeId}
                            reviews={reviews}
                            setReviews={setReviews}
                          />
                          <TouchableOpacity
                            onPress={() => handleAddDirectToList(item)}
                            style={theme.buttons.action}>
                            <Text style={theme.buttons.actionText}>
                              Add to List
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </Card.Content>
                    </View>
                  ))}
                </Card>
              </ScrollView>
            )}
            <View />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>Hide</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  buttonContainer: {
    flex: 1,
    width: '33%',
    alignSelf: 'flex-end',
  },
  container: {
    height: height / 1.7,
    // flexGrow: 1,
    width: '95%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  reviewText: {
    height: '100%',
    width: '20%',
  },
  reviewHeader: {
    paddingBottom: 10,
    borderColor: 'black',
  },
  reviewCard: {
    // width: '30%',
    // flexGrow: 1,
    alignSelf: 'flex-start',
    maxWidth: 350,
    // height: 300,
    // maxHeight: 1000
  },
});

export default DirectSearchPlace;
