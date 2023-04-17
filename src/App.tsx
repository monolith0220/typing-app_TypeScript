import { useState, useEffect } from "react";
import { EasyWords, HardWords } from "./WordList";

type Difficulty = "easy" | "hard";

const App: React.FC = () => {
	const [currentWord, setCurrentWord] = useState<string>("");
	const [typedWord, setTypedWord] = useState<string>("");
	const [score, setScore] = useState<number>(0);
	const [timeRemaining, setTimeRemaining] = useState<number>(60);
	const [gameStarted, setGameStarted] = useState<boolean>(false);
	const [judge, setJudge] = useState<boolean>(false);
	const [difficulty, setDifficulty] = useState<Difficulty>("easy");

	useEffect(() => {
		if (gameStarted && timeRemaining > 0) {
			setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
		} else {
			setGameStarted(false);
			alert(`Game Over! Your score is ${score}`);
		}
	}, [gameStarted, timeRemaining, score]);

	const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTypedWord(e.target.value);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			if (typedWord === currentWord) {
				setScore(score + 10);
				setJudge(true);
			} else {
				setJudge(false);
			}
			setCurrentWord(getRandomWord());
			setTypedWord("");
		}
	};

	const startGame = () => {
		setGameStarted(true);
		setCurrentWord(getRandomWord());
		setScore(0);
		setTimeRemaining(60);
	};

	const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value as Difficulty;
		setDifficulty(value);
	};

	const getRandomWord = (): string => {
		const wordList = difficulty === "easy" ? EasyWords : HardWords;
		const index = Math.floor(Math.random() * wordList.length);
		return wordList[index];
	};

	return (
		<div>
			<h1>Typing Game</h1>
			<p>残り時間: {timeRemaining}秒</p>
			<p>Score: {score}</p>
			{!gameStarted && (
				<div>
					<div>
						<label>難易度: </label>
						<select value={difficulty} onChange={handleDifficultyChange}>
							<option value="easy">易しい</option>
							<option value="hard">難しい</option>
						</select>
					</div>
					<button onClick={startGame}>Start</button>
				</div>
			)}
			{gameStarted && (
				<>
					<p>
						Type the word: <b style={{ color: "red" }}>{currentWord}</b>
					</p>
					<input type="text" value={typedWord} onChange={handleTyping} onKeyPress={handleKeyPress} />
					{judge ? <p>正解!!</p> : <p>不正解</p>}
				</>
			)}
		</div>
	);
};

export default App;
