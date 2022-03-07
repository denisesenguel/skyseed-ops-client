function generateAlphabet(capital = true) {
	return [...Array(26)].map((_, i) => String.fromCharCode(i + (capital ? 65 : 97)));
}

export { generateAlphabet };
