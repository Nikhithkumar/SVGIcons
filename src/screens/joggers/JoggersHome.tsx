/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect, Profiler} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import {Avatar, Bell, Close} from '../../assets';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CustomCalendarStrip from './CalendarSlider';
import moment from 'moment';
import {useGetImages} from '../../services/apiHooks/GetImages';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {BottomSheet, IBottomSheetRef} from './BottomSheet';

const {width, height} = Dimensions.get('window');

const Home = () => {
  const IsFocused = useIsFocused();
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
  const [showCalendar, setShowCalendar] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photos, setPhotos] = useState([]);
  const height1 = useSharedValue(200);
  const height2 = useSharedValue(70);
  const bottomSheetRef = React.useRef<IBottomSheetRef>(null);
  const {imagesData, isLoading, isError, refetchGetAllImages} = useGetImages();

  useFocusEffect(
    React.useCallback(() => {
      refetchGetAllImages();
      getAllPhotos();
    }, [IsFocused]),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, [photos]);

  const animatedStyles1 = useAnimatedStyle(() => ({
    height: height1.value,
  }));

  const animatedStyles2 = useAnimatedStyle(() => ({
    height: height2.value,
  }));

  const handleCalendar = () => {
    setShowCalendar(false);
    height1.value = withTiming(70);
    height2.value = withTiming(200);
  };

  const handleEvent = () => {
    setShowCalendar(true);
    height1.value = withTiming(200);
    height2.value = withTiming(70);
  };

  const getAllPhotos = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then(e => {
        setPhotos(e.edges);
      })
      .catch(err => {
        console.log('error=====>', err);
      });
  };

  const renderImages = ({item}) => {
    return (
      <View style={styles.imageContainer}>
        <Image
          source={{uri: item?.node?.image?.uri}}
          style={{width: '100%', height: 200}}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => bottomSheetRef.current?.expand()}
        style={{
          alignItems: 'center',
          position: 'absolute',
          top: 60,
          backgroundColor: 'green',
          borderRadius: 12,
          width: 100,
          height: 30,
          justifyContent: 'center',
        }}>
        <Text style={styles.joinBtnText}>Open</Text>
      </TouchableOpacity>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
        <View>
          <TouchableOpacity activeOpacity={0.9} onPress={handleCalendar}>
            <Animated.View style={[styles.calendarBox, animatedStyles1]}>
              <View style={styles.blackBall} />
              <View style={styles.profile}>
                <View
                  style={{
                    ...styles.profileBox,
                    top: !showCalendar ? -15 : null,
                  }}>
                  <Text style={styles.profileText}>Nikhith Kumar</Text>
                  <View style={styles.profileBox}>
                    <Bell width={30} height={30} />
                    <Avatar width={30} height={30} />
                  </View>
                </View>
                <Text
                  style={{
                    ...styles.profileText,
                    top: !showCalendar ? -15 : null,
                  }}>
                  January
                </Text>
                <View style={styles.divider} />
                {showCalendar && (
                  <CustomCalendarStrip
                    onDateSelected={setSelectedDate}
                    selectedDate={selectedDate}
                  />
                )}
              </View>
              <View style={{...styles.blackBall, top: 15}} />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} style={{...styles.eventBox}}>
            <View style={{...styles.blackBall, position: 'absolute'}} />
            <View style={styles.innerContainer}>
              <View style={styles.calendarDate}>
                <Text>23</Text>
              </View>
              <View style={styles.directionRow}>
                <TouchableOpacity style={styles.closeIcon}>
                  <Close width={12} height={12} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => bottomSheetRef.current?.expand()}
                  style={styles.joinBtn}>
                  <Text style={styles.joinBtnText}>Join</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} onPress={handleEvent}>
            <Animated.View style={[styles.fitnessBox, animatedStyles2]}>
              <View style={{...styles.blackBall, position: 'absolute'}} />
              <View style={styles.innerContainer}>
                <View style={styles.calendarDate}>
                  <Text>23</Text>
                </View>
                <View style={{flex: 1, marginLeft: 20}}>
                  <Text style={styles.profileText}>Today's Events</Text>
                  <Text style={{...styles.profileText, color: 'white'}}>
                    New York Marathon
                  </Text>
                </View>
                <TouchableOpacity style={styles.discountBtn}>
                  <Text style={styles.discountText}>20 % Discount</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableOpacity>
          <View style={styles.contentBox}>
            <View style={{...styles.blackBall, position: 'absolute'}} />
            <View style={styles.innerContainer}>
              <View style={styles.calendarDate}>
                <Text>DV</Text>
              </View>
              <TouchableOpacity style={styles.joinBtn}>
                <Text style={styles.joinBtnText}>Join</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.eventTextContainer}>
              <Text style={styles.eventText}>
                Annual charity event by city concil
              </Text>
            </View>

            <View style={styles.eventContainer}>
              <View
                style={{
                  ...styles.directionRow,
                  justifyContent: 'space-between',
                  width: width,
                }}>
                <Text
                  style={styles.text18}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  New York Annual Marathon
                </Text>
                <Text
                  style={styles.text18}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  22 December
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{top: -5}}>
          <FlatList
            data={photos ?? []}
            horizontal
            contentContainerStyle={{overflow: 'hidden', marginHorizontal: 10}}
            keyExtractor={item => item.id}
            renderItem={renderImages}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScrollToIndexFailed={() => {}}
          />
        </View>
      </ScrollView> */}
      <TouchableOpacity
        onPress={() => bottomSheetRef.current?.expand()}
        style={styles.joinBtn}>
        <Text style={styles.joinBtnText}>Join</Text>
      </TouchableOpacity>
      <BottomSheet ref={bottomSheetRef}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere amet
          eum alias asperiores, incidunt magni unde vero, aut deleniti
          accusantium ipsa aliquam magnam doloribus sequi! Nostrum cupiditate
          enim laborum doloribus dolores nesciunt? Voluptatibus, non, maiores
          laudantium, sed aperiam ab doloribus voluptas animi cum magni odit
          laborum repellat at rerum ducimus eius consequuntur! Quidem, ut
          dolorum! Esse sapiente voluptatum illo perferendis. Voluptas aliquam
          eius, vero nobis perspiciatis ipsum sit voluptatem nostrum beatae ea
          totam ex similique est a. Consequatur repellat excepturi sequi minus.
          Repudiandae, esse laboriosam alias iste ipsa amet eligendi sit
          voluptates minima autem similique ut quod ratione totam aliquam?
        </Text>
      </BottomSheet>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'rgb(0,0,0)',
    paddingHorizontal: 5,
    paddingVertical: 20,
    alignItems: 'center',
  },
  calendarBox: {
    width: width * 0.95,
    alignSelf: 'center',
    backgroundColor: '#c3fe34',
    borderRadius: 20,
    height: 200,
    justifyContent: 'space-between',
  },
  eventBox: {
    width: width * 0.95,
    alignSelf: 'center',
    backgroundColor: '#ffd7f1',
    borderRadius: 25,
    height: 50,
    justifyContent: 'space-between',
    marginVertical: 4,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  calendarRightBox: {
    flexDirection: 'row',
    alignSelf: 'center',
    top: -1,
    position: 'absolute',
    zIndex: 999,
    alignItems: 'center',
  },
  blackBall: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgb(0,0,0)',
    alignSelf: 'center',
    top: -12,
  },
  blackLine: {
    backgroundColor: 'rgb(0,0,0)',
    borderWidth: 1,
    width: width * 0.5,
    height: 5,
  },
  calendarDate: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgb(0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  joinBtn: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgb(0,0,0)',
  },
  joinBtnText: {
    fontSize: 14,
    color: 'rgb(0,0,0)',
    fontWeight: '400',
  },
  fitnessBox: {
    width: width * 0.95,
    alignSelf: 'center',
    backgroundColor: '#57b1e5',
    borderRadius: 25,
    height: 70,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  contentBox: {
    width: width * 0.95,
    alignSelf: 'center',
    backgroundColor: '#bbf6e1',
    borderRadius: 25,
    flexGrow: 1,
    height: 250,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 3,
    zIndex: 999,
  },
  closeIcon: {
    backgroundColor: 'white',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  directionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profile: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  profileText: {
    fontSize: 16,
    color: 'rgb(0,0,0)',
    fontWeight: '700',
    flexWrap: 'wrap',
  },
  divider: {
    width: width * 0.9,
    borderWidth: 1,
    borderColor: 'rgb(0,0,0)',
    alignSelf: 'center',
    height: 1,
  },
  imageContainer: {
    width: width - 10,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  discountBtn: {
    alignSelf: 'center',
    backgroundColor: '#bbf6e1',
    width: 90,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: -5,
    paddingVertical: 7,
    paddingHorizontal: 10,
    top: -2,
    marginRight: -10,
  },
  discountText: {
    fontSize: 14,
    color: 'rgb(0,0,0)',
    textAlign: 'center',
    fontWeight: '600',
  },
  eventTextContainer: {
    backgroundColor: '#57b1e5',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.6,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignSelf: 'flex-start',
    left: -10,
  },
  eventContainer: {
    alignItems: 'flex-start',
    width: '100%',
    height: 120,
  },
  eventText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
    width: width * 0.3,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  text18: {
    fontSize: 24,
    color: 'rgb(0,0,0)',
    fontWeight: '500',
  },
});
