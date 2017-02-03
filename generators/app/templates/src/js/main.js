/* © 2017 NauStud.io
 * @author ...
 */
$(function() {
	'use strict';
	// For fun, displaying Nau ASCII Art:
	var NAU_ASCII_ART = '   _.._             _.._           .--┐\n .`--.  \'.        .\'  .-`\'.       |   |\n.   .-\\   \\  (`) .   /-.   \\      |   |\n|   |  \\   \\     |   |  \\   \\     |   |\n|   |   \\   \\    |   |   \\   \\    |   |\n|   |    \\   \\   |   |    \\   \\   |   |\n|   |     \\   \\  |   |     \\   \\  |   |\n|   |      \\   `-/   |      \\   \\-\'   |\n|   |       \\_.-`   ,\'  (`)  \\   `-._.\'\n└--`         `-...-`          `-...-`\nNau Studio';
	console.log(NAU_ASCII_ART);
	$('body').append('<pre>' + NAU_ASCII_ART + '</pre>');
});
