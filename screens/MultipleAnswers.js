import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import multipleAnswers from '../assets/data/multipleAnswers.json';
import CustomBtn from '../components/CustomBtn';
import Indicator from '../components/Indicator';
import GameOver from '../components/GameOver';

export default MultipleAnswers = () => {

    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [triggerOptionClick, setTriggerOptionClick] = useState(0); /** To force rerender **/
    const [answers, setAnswers] = useState(new Set())
    const [validAnswer, setValidAnswer] = useState([])
    const [inValidAnswer, setInValidAnswer] = useState([])
    const [message, setMessage] = useState("")
    const [gameOver, setGameOver] = useState(false);

    const optionClicked = (option) => {
        setValidAnswer([])
        setInValidAnswer([])
        setMessage("")
        if (!answers.has(option)) {
            answers.add(option)
            setTriggerOptionClick(triggerOptionClick + 1)
        } else {
            answers.delete(option)
            setTriggerOptionClick(triggerOptionClick - 1)
        }
    }

    const checkAnswerClicked = () => {
        let currentPoint = 0;
        answers.forEach(answer => {
            if (answer.isValid) {
                validAnswer.push(answer.id)
                currentPoint++;
            } else {
                inValidAnswer.push(answer.id)
                currentPoint--;
            }
        })
        setValidAnswer([...validAnswer])
        setInValidAnswer([...inValidAnswer])

        if (currentPoint === multipleAnswers?.questions[currentQuestionIdx].points) {
            setMessage("اجابة صحيحة! أحسنت")
            setTimeout(() => {
                setTriggerOptionClick(0)
                setAnswers(new Set())
                setValidAnswer([])
                setInValidAnswer([])
                setMessage("")
                /**** check game over or move to next question ****/
                currentQuestionIdx + 1 === multipleAnswers?.questions?.length ?
                    setGameOver(true) :
                    setCurrentQuestionIdx(currentQuestionIdx + 1)
            }, 400);
        } else {
            inValidAnswer?.length ? setMessage('اجابة خاطئة حاول مرة اخرى') :
                validAnswer?.length ? setMessage('أحسنت, لكن هناك المزيد, حاول مرة أخرى') : null
        }
    }

    const checkBorderStyle = (option) => {
        if (validAnswer.includes(option.id)) {
            return borderStyle.green
        } else if (inValidAnswer.includes(option.id)) {
            return borderStyle.red
        } else if (answers.has(option)) {
            return borderStyle.blue
        } else {
            return borderStyle.normal
        }
    }

    const borderStyle = {
        red: {
            borderColor: "red",
        },
        green: {
            borderColor: "green",
        },
        blue: {
            borderColor: "#277BC0",
        },
        normal: {
            borderColor: "#ccc",
            borderWidth: 1,
        }
    }

    const checkBtnOptions = () => (answers.size < 1 || validAnswer.length || inValidAnswer.length) ?
        {
            activeOpacity: 1,
            btnStyle: { backgroundColor: "#bbb" },
            onPress: undefined
        } : { onPress: checkAnswerClicked }

    onPlayAgainClicked = () => {
        setCurrentQuestionIdx(0)
        setGameOver(false)
    }

    return (
        <>
            {
                gameOver ? <GameOver onPlayAgain={onPlayAgainClicked} /> :
                    <View style={styles.container} >
                        <View style={styles.indicatorsContainer}>
                            <View style={styles.progressBar}></View>
                            {
                                multipleAnswers?.questions?.map((item, idx) =>
                                    <Indicator key={item.id} idx={idx} currentQuestionIdx={currentQuestionIdx} />)
                            }
                        </View>
                        <View style={styles.questionContainer}>
                            <View>
                                <Text style={styles.questionBody}>
                                    {multipleAnswers?.questions[currentQuestionIdx]?.question}
                                </Text>
                                {
                                    multipleAnswers?.questions[currentQuestionIdx]?.options?.map((option, idx) =>
                                        <TouchableOpacity
                                            key={idx}
                                            activeOpacity={0.8}
                                            style={styles.optionContainer}
                                            onPress={() => optionClicked(option)}
                                        >
                                            <Text style={{ ...styles.optionBody, ...checkBorderStyle(option) }}>{option.body}</Text>
                                            <View style={{ ...styles.optionBox, ...checkBorderStyle(option) }}></View>
                                        </TouchableOpacity>
                                    )
                                }
                                {message && <Text>{message}</Text>}
                            </View>
                            <CustomBtn title="تحقق" {...checkBtnOptions()} />
                        </View>
                    </View>
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    indicatorsContainer: {
        alignSelf: "stretch",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    progressBar: {
        position: "absolute",
        top: "50%",
        borderColor: "#FFAE6D",
        borderWidth: 1,
        width: "100%"
    },
    questionContainer: {
        flex: 1,
        justifyContent: "space-between"
    },
    questionBody: {
        fontSize: 25,
        marginBottom: 15,
    },
    optionContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginVertical: 15,
    },
    optionBox: {
        width: 30,
        height: 30,
        backgroundColor: "white",
        borderWidth: 3,
        borderRadius: 5,
        marginLeft: 10,
        elevation: 2
    },
    optionBody: {
        flex: 1,
        backgroundColor: "white",
        fontSize: 22,
        borderWidth: 3,
        borderRadius: 10,
        padding: 12,
        width: "100%",
        elevation: 2
    }
});