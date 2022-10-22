import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Pressable } from 'react-native';
import GameOver from '../components/GameOver'
import data from '../assets/data/memoryGame.json';

const deviceWidth = Dimensions.get('window').width;
const imgArr = [...data?.images, ...data?.images]

const getImgOrder = (imgArr) => {
    let randomNumbers = []
    let newImagesOrder = []
    while (newImagesOrder.length < data?.images?.length * 2) {
        let num = Math.floor(Math.random() * (data?.images?.length * 2));
        if (!randomNumbers.includes(num)) {
            randomNumbers.push(num)
            newImagesOrder.push(imgArr[num]);
        }
    }
    return newImagesOrder;
}

export default MemoryGame = () => {

    const [imgOrder, setImgOrder] = useState(null);
    const [firstSelectedImg, setFirstSelectedImg] = useState(null);
    const [secondSelectedImg, setSecondSelectedImg] = useState(null);
    const [done, setDone] = useState([]);
    const [redImg, setRedImg] = useState([]);
    const [greenImg, setGreenImg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const shownImg = (id, idx) => {
        return firstSelectedImg?.idx === idx ||
            secondSelectedImg?.idx === idx ||
            done.includes(id)
    }

    const extraStyle = (id, idx) => ({
        borderWidth: redImg.includes(idx) || greenImg.includes(idx) ? 5 : 0,
        borderColor: redImg.includes(idx) ? "red" :
            greenImg.includes(idx) ? "green" : "",
        padding: done.includes(id) ? 10 : 0
    })

    const onImgClick = (id, idx) => {
        if (!firstSelectedImg) {
            setFirstSelectedImg({ id, idx })
        } else {
            setSecondSelectedImg({ id, idx })
            setLoading(true)
            if (id === firstSelectedImg?.id) {
                setGreenImg([firstSelectedImg.idx, idx])
                setDone([...done, id])
            } else {
                setRedImg([firstSelectedImg.idx, idx])
            }
            setTimeout(() => {
                setFirstSelectedImg(null)
                setSecondSelectedImg(null)
                setGreenImg([])
                setRedImg([])
                setLoading(false)
            }, 500)
        }
    }

    const sameImageClicked = (id, idx) => {
        if (firstSelectedImg?.id === id && firstSelectedImg?.idx === idx) {
            setFirstSelectedImg(null)
        }
    }

    useEffect(() => {
        imgArr?.length && setImgOrder(getImgOrder(imgArr))
    }, [imgArr])

    useEffect(() => {
        done.length === data?.images?.length && setGameOver(true)
    }, [done])

    onPlayAgainClicked = () => {
        setFirstSelectedImg(null)
        setSecondSelectedImg(null)
        setGreenImg([])
        setRedImg([])
        setDone([])
        setImgOrder(getImgOrder(imgArr))
        setGameOver(false)
    }

    return (
        <>
            {
                gameOver ? <GameOver onPlayAgain={onPlayAgainClicked} /> :
                    <View style={styles.container} >
                        <Text style={styles.description}>{data?.description}</Text>
                        <View style={styles.imagesContainer}>
                            {
                                imgOrder?.length &&
                                imgOrder.map((image, idx) => shownImg(image.id, idx) ?
                                    <Pressable
                                        key={idx}
                                        style={{ ...styles.imgContainer, ...extraStyle(image.id, idx) }}
                                        onPress={!done.includes(image.id) ? () => sameImageClicked(image.id, idx) : undefined}
                                    >
                                        <Image
                                            style={styles.images}
                                            source={{
                                                uri: image.src
                                            }}
                                        />
                                    </Pressable>
                                    : <TouchableOpacity
                                        activeOpacity={loading ? 1 : 0.2}
                                        key={idx}
                                        onPress={loading ? undefined : () => onImgClick(image.id, idx)}
                                    >
                                        <View style={styles.imgContainer}>
                                            <Image
                                                style={styles.images}
                                                source={{
                                                    uri: "https://thumbs.dreamstime.com/b/sticker-cartoon-question-mark-creative-illustrated-149241670.jpg"
                                                }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </View>
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    description: {
        fontSize: 30
    },
    imagesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        paddingHorizontal: deviceWidth * 0.1,
    },
    imgContainer: {
        overflow: "hidden",
        height: deviceWidth * 0.3,
        width: deviceWidth * 0.3,
        borderRadius: 10,
        marginBottom: 10,
    },
    images: {
        width: undefined,
        height: undefined,
        flex: 1,
    }
});