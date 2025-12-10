import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState as useFruiStan, useEffect as useStornnerEff, useRef } from 'react';
import {
    View as Viestorm,
    Dimensions as Tordimensnniu,
    Dimensions,
    Share,
} from 'react-native';
import TopBar from '../components/TopBar';
import GameField from '../components/GameField';
import ResultButtons from '../components/ResultButtons';
import ModeSelect from '../components/ModeSelect';
import ProfileBar from '../components/ProfileBar';

// Додаємо зображення фруктів
const fruitImages = [
    require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/watermelon.png'),
    require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/plum.png'),
    require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/orange.png'),
    require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/strawberry.png'),
];

const fruitTypes = [
    { key: 'plum', img: require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/plum.png') },
    { key: 'orange', img: require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/orange.png') },
    { key: 'watermelon', img: require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/watermelon.png') },
    { key: 'strawberry', img: require('../FoldenUinnerFruitStormAssets/FoldenUinnerFruitStormImages/strawberry.png') },
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFruit() {
    const idx = getRandomInt(0, fruitImages.length - 1);
    return fruitImages[idx];
}

function getRandomPositionX(frameW, fruitSize) {
    // X в межах екрану, не виходить за межі
    return getRandomInt(-Dimensions.get('window').width * 0.5, Math.floor(frameW - fruitSize) - Dimensions.get('window').width * 0.5);
}

function getRandomPosition(frameW, frameH, fruitSize) {
    const margin = frameW * 0.04;
    const minX = margin - Dimensions.get('window').width * 0.5;
    const maxX = Math.max(margin, Math.floor(frameW - fruitSize - margin)) - Dimensions.get('window').width * 0.5;
    const minY = frameH * 0.18;
    const maxY = frameH - fruitSize * 1.5 - Dimensions.get('window').height * 0.1;
    // Логи розмірів поля для спавну
    console.log('[SPAWN FIELD] frameW:', frameW, 'fruitSize:', fruitSize, 'minX:', minX, 'maxX:', maxX, 'minY:', minY, 'maxY:', maxY);
    const x = getRandomInt(minX, maxX);
    const y = getRandomInt(minY, maxY);
    return { x, y };
}

function getFruitKey(img) {
    if (img === fruitTypes[0].img) return 'plum';
    if (img === fruitTypes[1].img) return 'orange';
    if (img === fruitTypes[2].img) return 'watermelon';
    if (img === fruitTypes[3].img) return 'strawberry';
    return '';
}

// Зберегти статистику фруктів у AsyncStorage
async function saveFruitStatsToStorage(stats) {
    try {
        for (const key of Object.keys(stats)) {
            const storageKey = `fruitStat_${key}`;
            const prev = await AsyncStorage.getItem(storageKey);
            const prevVal = prev ? parseInt(prev, 10) : 0;
            await AsyncStorage.setItem(storageKey, String(prevVal + stats[key]));
        }
    } catch (e) {
        console.log('Error saving fruit stats:', e);
    }
}

export default function UinFrueiGames({ setCurrentSectionKey, gameMode, setGameMode }: { setCurrentSectionKey: (key: string) => void; gameMode: string | null; setGameMode: (mode: string | null) => void; }) {
    const { width: frameW, height: frameH } = Tordimensnniu.get('window');
    const [fruiUserlde, setfruiUserlde] = useFruiStan('');
    const [storuitImage, setstoruitImage] = useFruiStan(null);

    // --- GAME STATE ---
    const [timer, setTimer] = useFruiStan(60);
    const [caught, setCaught] = useFruiStan(0);
    const [fruits, setFruits] = useFruiStan([]);
    const [gameOver, setGameOver] = useFruiStan(false);
    const [fruitStats, setFruitStats] = useFruiStan({ plum: 0, orange: 0, watermelon: 0, strawberry: 0 });
    const [startTime, setStartTime] = useFruiStan<number | null>(null);
    const [reactionTime, setReactionTime] = useFruiStan<number | null>(null);
    const timerRef = useRef(null);

    // --- INIT USER ---
    useStornnerEff(() => {
        AsyncStorage.getItem('profileName').then(val => {
            if (val) setfruiUserlde(val);
        });
        AsyncStorage.getItem('profilePhoto').then(val => {
            if (val) setstoruitImage({ uri: val });
        });
    }, []);

    // --- GAME LOOP ---
    useStornnerEff(() => {
        if (!gameMode || gameOver) return;
        // --- Трекінг входу у гру ---
        (async () => {
            const prevGamesStr = await AsyncStorage.getItem('gamesPlayed');
            const prevGames = prevGamesStr ? parseInt(prevGamesStr, 10) : 0;
            await AsyncStorage.setItem('gamesPlayed', String(prevGames + 1));
        })();

        // Скидаємо таймер, caught, фрукти, статистику тільки якщо це новий запуск
        setTimer(60);
        setCaught(0);
        setGameOver(false);
        setFruits([]);
        setFruitStats({ plum: 0, orange: 0, watermelon: 0, strawberry: 0 });

        // --- Для реакції ---
        setStartTime(Date.now());
        setReactionTime(null);

        // Старт гри
        let interval = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setGameOver(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        timerRef.current = interval;

        let fruitInterval;
        if (gameMode === 'normal') {
            fruitInterval = setInterval(() => {
                if (gameOver) return; // <-- додано
                setFruits(prev => [
                    ...prev,
                    {
                        id: Math.random().toString(36).slice(2),
                        img: getRandomFruit(),
                        x: getRandomPositionX(frameW, frameW * 0.18),
                        y: -frameW * 0.18,
                        speed: getRandomInt(frameH * 0.008, frameH * 0.012),
                    },
                ]);
            }, 700);
        } else if (gameMode === 'medium') {
            fruitInterval = setInterval(() => {
                if (gameOver) return;
                const fruit = {
                    id: Math.random().toString(36).slice(2),
                    img: getRandomFruit(),
                    ...getRandomPosition(frameW, frameH, frameW * 0.18),
                };
                // Лог позиції нового фрукту
                console.log('[SPAWN FRUIT] medium x:', fruit.x, 'y:', fruit.y);
                setFruits([fruit]);
                setTimeout(() => {
                    setFruits(prev => prev.filter(f => f.id !== fruit.id));
                }, 700);
            }, 750);
        } else if (gameMode === 'mega') {
            const spawnMega = () => {
                if (gameOver) return; // <-- додано
                const mainFruit = getRandomFruit();
                const otherFruit = getRandomFruit();
                // Гарантуємо, що інший фрукт не такий як основний
                let diffFruit = otherFruit;
                while (diffFruit === mainFruit) diffFruit = getRandomFruit();
                const positions = [
                    { x: getRandomPositionX(frameW, frameW * 0.18), y: frameH * 0.22 },
                    { x: getRandomPositionX(frameW, frameW * 0.18), y: frameH * 0.42 },
                    { x: getRandomPositionX(frameW, frameW * 0.18), y: frameH * 0.62 },
                ];
                const fruitsArr = [
                    { id: Math.random().toString(36).slice(2), img: mainFruit, ...positions[0], isTarget: false },
                    { id: Math.random().toString(36).slice(2), img: mainFruit, ...positions[1], isTarget: false },
                    { id: Math.random().toString(36).slice(2), img: diffFruit, ...positions[2], isTarget: true },
                ];
                setFruits(fruitsArr);
                // Якщо не тапнув по target за 0.5 сек — програв
                setTimeout(() => {
                    setFruits(prev => {
                        if (prev.some(f => f.isTarget)) {
                            // target ще є — не зловив
                            setGameOver(true);
                            clearInterval(timerRef.current);
                            return [];
                        }
                        return prev;
                    });
                }, 500);
            };
            fruitInterval = setInterval(spawnMega, 1200);
        }

        return () => {
            clearInterval(interval);
            clearInterval(fruitInterval);
        };
    }, [gameMode, gameOver]); // додано gameOver в залежності

    // --- NORMAL MODE: рух фруктів вниз ---
    useStornnerEff(() => {
        if (!gameMode || gameOver) return;
        if (gameMode === 'normal') {
            const moveInterval = setInterval(() => {
                setFruits(prev =>
                    prev
                        .map(fruit => ({
                            ...fruit,
                            y: fruit.y + fruit.speed,
                        }))
                        .filter(fruit => fruit.y < frameH)
                );
            }, 16);
            return () => clearInterval(moveInterval);
        }
    }, [gameMode, gameOver]);

    // --- TAP FRUIT ---
    const handleCatchFruit = (id, isTarget = false) => {
        if (gameMode === 'mega' && !isTarget) return;
        setFruits(prev => prev.filter(fruit => fruit.id !== id));
        setCaught(prev => prev + 1);
        setFruitStats(prev => {
            const fruit = fruits.find(f => f.id === id);
            if (!fruit) return prev;
            const key = getFruitKey(fruit.img);
            return { ...prev, [key]: prev[key] + 1 };
        });

        // --- Реакція для medium/mega ---
        if ((gameMode === 'medium' || gameMode === 'mega') && startTime) {
            const now = Date.now();
            const currentReaction = (now - startTime) / 1000;
            setReactionTime(currentReaction);
            setStartTime(null); // щоб не оновлювати повторно
        }
    };

    // --- END GAME ---
    useStornnerEff(() => {
        if (gameOver && gameMode) {
            // Зберігаємо статистику фруктів після гри
            saveFruitStatsToStorage(fruitStats);

            // --- Логіка рівня ---
            (async () => {
                const fruitsThisGame = Object.values(fruitStats).reduce((a, b) => a + b, 0);
                const prevTotalStr = await AsyncStorage.getItem('totalFruitsCaught');
                const prevTotal = prevTotalStr ? parseInt(prevTotalStr, 10) : 0;
                const newTotal = prevTotal + fruitsThisGame;
                await AsyncStorage.setItem('totalFruitsCaught', String(newTotal));

                // Новий рівень: 100 фруктів на рівень
                const fruitsPerLevel = 100;
                const newLevel = Math.min(1 + Math.floor(newTotal / fruitsPerLevel), 50);
                await AsyncStorage.setItem('userLevel', String(newLevel));
                // Прогрес до наступного рівня (0..1)
                const progress = Math.min((newTotal % fruitsPerLevel) / fruitsPerLevel, 1);
                await AsyncStorage.setItem('levelProgress', String(progress));

                // --- Найкраща реакція для medium/mega ---
                if ((gameMode === 'medium' || gameMode === 'mega') && reactionTime) {
                    const prevBestStr = await AsyncStorage.getItem('fastestReaction');
                    const prevBest = prevBestStr ? parseFloat(prevBestStr) : null;
                    if (!prevBest || reactionTime < prevBest) {
                        await AsyncStorage.setItem('fastestReaction', reactionTime.toFixed(2));
                    }
                }
            })();
        }
    }, [gameOver]);

    // --- ВИХІД З ГРИ ---
    const handleExitGame = async () => {
        await saveFruitStatsToStorage(fruitStats);

        const fruitsThisGame = Object.values(fruitStats).reduce((a, b) => a + b, 0);
        const prevTotalStr = await AsyncStorage.getItem('totalFruitsCaught');
        const prevTotal = prevTotalStr ? parseInt(prevTotalStr, 10) : 0;
        const newTotal = prevTotal + fruitsThisGame;
        await AsyncStorage.setItem('totalFruitsCaught', String(newTotal));
        const fruitsPerLevel = 100;
        const newLevel = Math.min(1 + Math.floor(newTotal / fruitsPerLevel), 50);
        await AsyncStorage.setItem('userLevel', String(newLevel));
        const progress = Math.min((newTotal % fruitsPerLevel) / fruitsPerLevel, 1);
        await AsyncStorage.setItem('levelProgress', String(progress));

        // --- Найкраща реакція для medium/mega ---
        if ((gameMode === 'medium' || gameMode === 'mega') && reactionTime) {
            const prevBestStr = await AsyncStorage.getItem('fastestReaction');
            const prevBest = prevBestStr ? parseFloat(prevBestStr) : null;
            if (!prevBest || reactionTime < prevBest) {
                await AsyncStorage.setItem('fastestReaction', reactionTime.toFixed(2));
            }
        }

        setGameMode(null);
        setGameOver(false);
        setFruits([]);
        setTimer(60);
        setCaught(0);
        setFruitStats({ plum: 0, orange: 0, watermelon: 0, strawberry: 0 });
        setStartTime(null);
        setReactionTime(null);
    };

    // --- TRY AGAIN ---
    const handleTryAgain = () => {
        setGameOver(false);
        setFruits([]);
        setCaught(0);
        setTimer(60);
        setFruitStats({ plum: 0, orange: 0, watermelon: 0, strawberry: 0 });
        setStartTime(null);
        setReactionTime(null);
    };

    // --- SHARE (заглушка) ---
    const handleShare = () => {
        // Тут можна реалізувати share через Share API
        Share.share({
            message: `I scored ${caught} fruits in Uinner Fruit Storm! Can you beat my score?`,
        })
    };

    // --- UI ---
    if (gameMode) {
        return (
            <Viestorm style={{ flex: 1, backgroundColor: 'transparent' }}>
                <TopBar
                    timer={timer}
                    frameH={frameH}
                    gameOver={gameOver}
                    onExit={handleExitGame}
                    caught={caught}
                    fruitStats={fruitStats}
                    frameW={frameW}
                />
                <Viestorm style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                    {gameOver ? (
                        <ResultButtons
                            frameW={frameW}
                            frameH={frameH}
                            onTryAgain={handleTryAgain}
                            onShare={handleShare}
                            onExit={handleExitGame}
                        />
                    ) : (
                        <GameField
                            frameW={frameW}
                            frameH={frameH}
                            fruits={fruits}
                            onCatch={handleCatchFruit}
                        />
                    )}
                </Viestorm>
            </Viestorm>
        );
    }

    if (!gameMode) {
        return (
            <Viestorm style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <ProfileBar
                    frameW={frameW}
                    frameH={frameH}
                    storuitImage={storuitImage}
                    fruiUserlde={fruiUserlde}
                />
                <ModeSelect
                    frameW={frameW}
                    frameH={frameH}
                    setGameMode={setGameMode}
                />
            </Viestorm>
        );
    }
}
