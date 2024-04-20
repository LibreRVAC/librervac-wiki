// Copyright (C) 2014  Alex-Daniel Jakimenko <alex.jakimenko@gmail.com>
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

function underlineAccessKeys() {
    if (!document.getElementsByTagName) return; // too old browsers (IE <5.5)

    var labels = document.getElementsByTagName('label');
    for (var i = 0; i < labels.length; i++) {
	var htmlFor = document.getElementById(labels[i].htmlFor);
	if (htmlFor && htmlFor.accessKey)
	    underlineInNodes(labels[i], htmlFor.accessKey);
	else if (labels[i].accessKey)
	    underlineInNodes(labels[i], labels[i].accessKey);
    }

    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++)
	if (inputs[i].accessKey)
	    if (inputs[i].type == 'submit' || inputs[i].type == 'button' || inputs[i].type == 'text') {
		var newStr = underlineCharacter(inputs[i].value, inputs[i].accessKey);
		if (newStr != inputs[i].value)
		    inputs[i].value = newStr;
		else if (inputs[i].getAttribute('placeholder') != null)
		    inputs[i].setAttribute('placeholder', underlineCharacter(inputs[i].getAttribute('placeholder'),
									     inputs[i].accessKey)); // XXX
	    }

    var tagNames = new Array('a', 'button', 'legend');
    for (var j = 0; j < tagNames.length; j++) {
	var elements = document.getElementsByTagName(tagNames[j]);
	for (var i = 0; i < elements.length; i++)
	    if (elements[i].accessKey)
		underlineInNodes(elements[i], elements[i].accessKey);
    }
}

function underlineInNodes(element, character) {
    for (var i = 0; i < element.childNodes.length; i++)
	if (element.childNodes[i].nodeType == 3) { // only text nodes
	    var newValue = underlineCharacter(element.childNodes[i].nodeValue, character);
	    if (element.childNodes[i].nodeValue != newValue) {
		element.childNodes[i].nodeValue = newValue;
		break;
	    }
	}
}

function underlineCharacter(string, character) {
    // unicode things work too unexpectedly on different platforms
    // and different fonts. Feel free to change this!
    var regex = new RegExp('(' + character + ')', 'i');
    if (navigator.appVersion.indexOf("Win") != -1)
	return string.replace(regex, "\u035F$1");
    else
	return string.replace(regex, "\u0332$1");
    //return string.replace(regex, "\u0331$1"); // another good combining underline, but it is a bit too short
}

onload = underlineAccessKeys;
