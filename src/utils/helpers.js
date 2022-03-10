function generateAlphabet(capital = true) {
	return [...Array(26)].map((_, i) => String.fromCharCode(i + (capital ? 65 : 97)));
}

// check if a last name starts with an letter (provided uppercased).
// ignore titles and case in last name
function lastNameStartsWith(name, letter) {
	let nameCapital = name.toUpperCase();
	const ignore = ['VON ', 'VAN ', 'ZU ', 'DEM ', 'DEN ', 'ZUM '];
	ignore.forEach(item => nameCapital = nameCapital.replace(item, ''));
	return nameCapital.trim()[0]  === letter;
}

export { generateAlphabet, lastNameStartsWith };
