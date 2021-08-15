/*
TW-Sounds: A Sound Analysis Library for TW5 plugin

Copyright 2021 Finn Lancaster, TiddlyWiki Community

Under MIT License
*/


// WARNING: A had a mental fucking breakdown writing this code.

// global variable declarations
// array we will populate with key, keypair
var key_keypair = [];
var CMU_dictionary = [];
var user_ipa = ""

// CMU Dictionary of 133000 words to IPA format
const url = "https://flancast90.github.io/TW-Sounds/lib/CMU.in.IPA.txt"
fetch(url)
   .then( r => r.text() )
   // regex below will remove tab spaces from txt file.
   // it took my dumb ass three fucking days to find that HT = tab.
   .then( t => extract_ipa(t.replace(/\t/g, "")));

// this function organises the output of the CMU IPA
// Dict to arrays. 
function extract_ipa(ipa_input) {
    // local function vars
	var clean_text = (ipa_input.replaceAll("\n","<br>"));
    var clean_array = clean_text.split("<br>");
    
    for (let i = 0; i < clean_array.length-1; i++) {
     
     key_keypair.push(clean_array[i].split(",")[0].replaceAll(" ", ""));
	 key_keypair.push(clean_array[i].replaceAll(" ", "").split(",")[1]);
     
    }
}


// this function finds similar-sounding words based
// on the user's word input
function find_similar(pronunciation) {
	var word = pronunciation.split("");
    document.write(word);
    var index = key_keypair.indexOf("aalseth");
    alert(key_keypair[index+1]);
}

function handle_user_input(user_input) {

// words are always at an even index, with their definitions 
// at odd, so we can add two and half the eval time.
	for (let i = 0; i < key_keypair.length - 1; i++) {
	
    	if (key_keypair[i] == user_input.toLowerCase()) {
        	// first, make sure the word is the word, and not 
            // the definition.
            
            if ((i % 2) == 0) {
        		// next index in array will always be the ipa of the 
        		// word before.
        		user_ipa = key_keypair[i + 1];
                console.log(user_ipa);
                find_similar(user_ipa);
                break;
            } else {
            	// God fucking save us
                // Yes, I've been reading the funniest code comments
                // on StackOverflow.
                
                // No Joke. This below line is fucking voodoo.
                // Try removing it and the program doesn't run.
                // no, seriously, try it karen.
                console.error("Something went wrong");
            }
            
        } else {
        	// loop keeps going
        }
    }
    
}

setTimeout(function() {
	handle_user_input("aalseth");
}, 5000);
