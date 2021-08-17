/*
 * TW Sounds: An Experimental Approach to Determining Rhymes
 *
 * Copyright Finn Lancaster 2021, TW Community 
 *
 * MIT License
*/

// global variable declaration

var syllables_split = [];
var dictionary_list = [];
var rhymes = [];

async function get_dictionary() {
// now a very fucking long dictionary of words
	const url = "https://flancast90.github.io/TW-Sounds/lib/words_alpha.txt"

    const response = await fetch(url)
        .then( r => r.text() )
        // regex below will remove tab spaces from txt file.
        // it took my dumb ass three fucking days to find that HT = tab.
        .then( t => dictionary_to_syllables(t.replace(/\t/g, "")));

    return response;
}

//break the dictionary words into syllables

function dictionary_to_syllables(dict) {

// local function vars
	var clean_text = (dict.replaceAll("\n","<br>"));
    dictionary_list = clean_text.split("<br>");
}

async function into_syllables(user_input) {
	
    await get_dictionary();
	// use regex to split word into syllables
    // https://stackoverflow.com/questions/49403285/splitting-word-into-syllables-in-javascript/49407494

	const vowels = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;
    
    for (var i = 0; i < dictionary_list.length; i ++) {
    // updating variable to change all values to array
    var single_syllable_word = [];
    	if (Array.isArray(dictionary_list[i].match(vowels))) {
    		dictionary_list[i] = dictionary_list[i].match(vowels);
        } else {
        	single_syllable_word.push(dictionary_list[i].match(vowels));
            dictionary_list[i] = single_syllable_word;
        }
    }
    
    // no need for good practises or return, we'll just update
    // global var.
    syllables_split = (user_input.match(vowels));
}

// voodoo magick below this line

async function find_potential_rhymes(user_input) {
// split into syllables first
	await into_syllables(user_input);
    
    //local function variable
    
    //use custom algorithm to determine probability of
    //rhyme.
    
    /*
     * Using word syllables, check last syllable similarity 
     * between two words. If they are the same, it is nearly a 100% rhyme
     * as the similar letters approach all of the same, confidence also increases,
     * if not similar at all, it is closer to 0%
    */
    
    for (var i = 0; i < dictionary_list.length; i++){
    	// this is the var we will store an array of letters for 
        // each word in the dictionary for. We can then determine
        // the percent difference to the user input to decide whether
        // it is a probable rhyme or not.
    	// the above functionality will be added in a later release
        
    	if (dictionary_list[i][dictionary_list[i].length-1] == syllables_split[syllables_split.length-1]) {
        	var new_rhyme = dictionary_list[i].join("");
            
            // replace duplicate values
            if (new_rhyme !== user_input) {
            	rhymes.push(new_rhyme);
            }
        }
    }
    //output all the rhymes we found
    
    return rhymes;
}
