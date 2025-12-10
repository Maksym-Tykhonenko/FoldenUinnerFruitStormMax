import Sound from 'react-native-sound';
import UinFrueiGames from './UinFrueiGames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
    useState as sparkUnitState,
} from 'react';

type FluxSections =
    | 'Storm Wrap Container Fruit'
    | 'awards'
    | 'settings'
    | 'start'
    | 'practice';

import {
    Text as StormTxtUnit,
    View as RootFluxShell,
    Dimensions as DimStormView,
    Image as FluxBackDro,
    TouchableOpacity as FluxTapSpot,
} from 'react-native';

import FruSettsolden from './FruSettsolden';
import { storfontsinner } from '../storfontsinner';
import StoruitnnerProfile from './StoruitnnerProfile';
import StormUinfrutStat from './StormUinfrutStat';
import WAwardsFruis from './WAwardsFruis';

const AUDIO_FLAG_KEY = 'folrutorm-storm-audio-key';
const { width: FLX_W, height: FLX_H } = DimStormView.get('window');
const AUDIO_FILE_PATH = 'soundOfUinnerFruit.mp3';

const foldBotBar = [
    {
        ico: require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/icsOfBtm/home.png'),
        page: 'Storm Wrap Container Fruit',
    },
    {
        ico: require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/icsOfBtm/stat.png'),
        page: 'stat',
    },
    {
        ico: require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/icsOfBtm/awards.png'),
        page: 'awards',
    },
    {
        ico: require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/icsOfBtm/profile.png'),
        page: 'profile',
    },
    {
        ico: require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/icsOfBtm/settings.png'),
        page: 'settings',
    },
];

let loopedBeat: Sound | null = null;

const FolstornnerLocalPage: React.FC = () => {
    const [soundSwitch, setSoundSwitch] = sparkUnitState<boolean | null>(null);
    const [hoonowBattlePage, setHoonowBattlePage] = sparkUnitState<FluxSections>('Storm Wrap Container Fruit');
    const [gameMode, setGameMode] = sparkUnitState<string | null>(null);

    React.useEffect(() => {
        (async () => {
            const beltFlag = await AsyncStorage.getItem(AUDIO_FLAG_KEY);
            if (beltFlag === null) {
                await AsyncStorage.setItem(AUDIO_FLAG_KEY, 'true');
                setSoundSwitch(true);
            } else {
                setSoundSwitch(beltFlag === 'true');
            }
        })();
    }, []);

    React.useEffect(() => {
        if (soundSwitch === null) return;

        if (loopedBeat) {
            loopedBeat.stop(() => {
                loopedBeat?.release();
                loopedBeat = null;
            });
        }

        if (soundSwitch) {
            Sound.setCategory('Playback');
            loopedBeat = new Sound(AUDIO_FILE_PATH, Sound.MAIN_BUNDLE, (err) => {
                if (!err && loopedBeat) {
                    loopedBeat.setNumberOfLoops(-1);
                    loopedBeat.play();
                }
            });
        }

        return () => {
            if (loopedBeat) {
                loopedBeat.stop(() => {
                    loopedBeat?.release();
                    loopedBeat = null;
                });
            }
        };
    }, [soundSwitch]);

    const renderCoreScreen = (key: FluxSections) => {
        switch (key) {
            case 'Storm Wrap Container Fruit':
                return (
                    <UinFrueiGames
                        setCurrentSectionKey={setHoonowBattlePage}
                        gameMode={gameMode}
                        setGameMode={setGameMode}
                    />
                );
            case 'stat':
                return <StormUinfrutStat setCurrentSectionKey={setHoonowBattlePage} />;
            case 'awards':
                return <WAwardsFruis setCurrentSectionKey={setHoonowBattlePage} />;
            case 'profile':
                return <StoruitnnerProfile setCurrentSectionKey={setHoonowBattlePage} />;
            case 'settings':
                return (
                    <FruSettsolden
                        soundSwitch={soundSwitch}
                        setSoundSwitch={setSoundSwitch}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <RootFluxShell
            style={{
                backgroundColor: '#000',
                flex: 1,
                height: FLX_H,
                width: FLX_W,
            }}
        >
            <FluxBackDro
                source={require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/background.png')}
                style={{
                    height: FLX_H,
                    width: FLX_W,
                    position: 'absolute',
                }}
                resizeMode="cover"
            />

            {hoonowBattlePage !== 'Storm Wrap Container Fruit' && (
                <RootFluxShell
                    style={{
                        borderBottomLeftRadius: FLX_W * 0.07,
                        width: FLX_W * 1.02,
                        borderBottomRightRadius: FLX_W * 0.07,
                        paddingTop: FLX_H * 0.07,
                        paddingHorizontal: FLX_W * 0.07,
                        paddingBottom: FLX_H * 0.03,
                        alignItems: 'center',
                        borderColor: '#FDD721',
                        borderTopColor: 'transparent',
                        borderWidth: 3,
                        alignSelf: 'center',
                        backgroundColor: '#5D0100',
                    }}
                >
                    <StormTxtUnit
                        style={{
                            letterSpacing: 1,
                            fontWeight: 'bold',
                            color: '#fff',
                            fontSize: FLX_W * 0.07,
                            fontFamily: storfontsinner.foldinLondrinaSolBlack,
                            textAlign: 'center',
                        }}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                    >
                        {hoonowBattlePage === 'stat'
                            ? 'STATISTICS'
                            : hoonowBattlePage === 'awards'
                            ? 'AWARDS'
                            : hoonowBattlePage.toUpperCase().replace(/_/g, ' ')}
                    </StormTxtUnit>
                </RootFluxShell>
            )}

            {renderCoreScreen(hoonowBattlePage)}

            {gameMode === null && (
                <RootFluxShell
                    style={{
                        flexDirection: 'row',
                        borderBottomColor: 'transparent',
                        backgroundColor: '#5D0100',
                        borderTopLeftRadius: FLX_W * 0.1,
                        borderTopRightRadius: FLX_W * 0.1,
                        borderColor: '#FDD721',
                        paddingVertical: FLX_H * 0.05,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: FLX_W * 0.07,
                        zIndex: 999,
                        width: FLX_W * 1.02,
                        borderWidth: 3,
                        bottom: 0,
                        alignSelf: 'center',
                        position: 'absolute',
                    }}
                >
                    {foldBotBar.map((item, idx) => (
                        <FluxTapSpot key={idx} onPress={() => setHoonowBattlePage(item.page)}>
                            <FluxBackDro
                                resizeMode="contain"
                                style={{
                                    height: FLX_W * 0.091,
                                    width: FLX_W * 0.091,
                                    tintColor:
                                        hoonowBattlePage === item.page ? '#FDD721' : '#280000',
                                }}
                                source={item.ico}
                            />
                        </FluxTapSpot>
                    ))}
                </RootFluxShell>
            )}
        </RootFluxShell>
    );
};

export default FolstornnerLocalPage;